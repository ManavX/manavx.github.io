import { motion } from 'framer-motion';

interface SpaceNavProps {
  onScrollTo: (section: 'skills' | 'projects' | 'experience') => void;
}

export function SpaceNav({ onScrollTo }: SpaceNavProps) {
  const spaceIcons = [
    {
      id: 'projects',
      label: 'Projects',
      icon: '🚀',
      title: 'Rocket - Launch My Projects',
      color: '#FF6B6B',
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: '🔭',
      title: 'Telescope - Explore My Skills',
      color: '#4ECDC4',
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: '🛸',
      title: 'UFO - Navigate My Experience',
      color: '#F4D03F',
    },
  ];

  return (
    <motion.nav
      className="space-nav"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        {spaceIcons.map((item, index) => (
          <motion.button
            key={item.id}
            className="space-nav-button"
            onClick={() => onScrollTo(item.id as 'skills' | 'projects' | 'experience')}
            title={item.title}
            style={{ '--item-color': item.color } as React.CSSProperties}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="space-icon">{item.icon}</span>
            <span className="space-label">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
