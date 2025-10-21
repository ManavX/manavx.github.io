import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ChessPieceNavProps {
  onToggle: (section: 'skills' | 'projects' | 'experience') => void;
  visibleSections: {
    skills: boolean;
    projects: boolean;
    experience: boolean;
  };
}

export function ChessPieceNav({ onToggle, visibleSections }: ChessPieceNavProps) {
  const { scrollYProgress } = useScroll();
  const [showButtons, setShowButtons] = useState(false);

  // Show buttons after scrolling past hero
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.15) {
        setShowButtons(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);

  const chessPieces = [
    {
      id: 'projects',
      label: 'Projects',
      icon: '♜',
      title: 'Rook - Strategic Moves',
      color: '#FF6B6B',
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: '♞',
      title: 'Knight - Technical Arsenal',
      color: '#4ECDC4',
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: '♚',
      title: 'King - Career Journey',
      color: '#F4D03F',
    },
  ];

  if (!showButtons) return null;

  return (
    <motion.div
      className="chess-piece-nav"
      style={{ opacity, scale }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {chessPieces.map((piece, index) => (
        <motion.button
          key={piece.id}
          className={`chess-piece-button ${
            visibleSections[piece.id as keyof typeof visibleSections]
              ? 'active'
              : ''
          }`}
          onClick={() => onToggle(piece.id as 'skills' | 'projects' | 'experience')}
          title={piece.title}
          style={{ '--piece-color': piece.color } as React.CSSProperties}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="chess-icon">{piece.icon}</span>
          <span className="chess-label">{piece.label}</span>
          {visibleSections[piece.id as keyof typeof visibleSections] && (
            <motion.div
              className="active-indicator"
              layoutId="activeIndicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
