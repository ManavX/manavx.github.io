import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function IntroTextBox() {
  const [displayedText, setDisplayedText] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const fullText = "👋 Hey, I'm Manav — a full-stack developer from Vancouver who loves turning complex ideas into clean, usable software. When I'm not coding, you'll probably find me climbing, gaming, or curating a new playlist!";

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed);
      }
    };

    // Start typing after a short delay
    const startDelay = setTimeout(() => {
      typeNextChar();
    }, 800);

    return () => {
      clearTimeout(startDelay);
    };
  }, [fullText]);

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          className="intro-textbox"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <button className="intro-textbox-close" onClick={handleClose} aria-label="Close">
            ✕
          </button>
          <p className="intro-textbox-text">
            {displayedText}
            {displayedText.length < fullText.length && (
              <span className="intro-textbox-cursor">|</span>
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
