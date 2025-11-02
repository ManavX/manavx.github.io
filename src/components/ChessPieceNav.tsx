import { motion } from 'framer-motion';
import { useAsteroidGame } from '../contexts/AsteroidGameContext';

interface ChessPieceNavProps {
  onScrollTo: (section: 'skills' | 'projects' | 'experience') => void;
}

export function ChessPieceNav({ onScrollTo }: ChessPieceNavProps) {
  const { score, spawnAsteroids } = useAsteroidGame();
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

  const handleNavClick = (section: 'skills' | 'projects' | 'experience') => {
    spawnAsteroids(4);
    onScrollTo(section);
  };

  return (
    <motion.nav
      className="chess-piece-nav"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        {chessPieces.map((piece, index) => (
          <motion.button
            key={piece.id}
            className="chess-piece-button"
            onClick={() => handleNavClick(piece.id as 'skills' | 'projects' | 'experience')}
            title={piece.title}
            style={{ '--piece-color': piece.color } as React.CSSProperties}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="chess-icon">{piece.icon}</span>
            <span className="chess-label">{piece.label}</span>
          </motion.button>
        ))}

        <motion.div
          className="score-display"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="score-icon">🎯</span>
          <span className="score-value">{score}</span>
        </motion.div>
      </div>
    </motion.nav>
  );
}
