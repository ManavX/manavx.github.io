import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { resumeData } from '../data/resumeData';

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Career Endgame</h2>
      </motion.div>

      <div className="experience-container">
        {resumeData.experience.map((exp, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={`exp-wrapper-${index}`}
              className={`experience-card ${isExpanded ? 'expanded' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(index);
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="experience-header">
                  <div>
                    <h3>{exp.company}</h3>
                    <p className="experience-role">{exp.role}</p>
                    <p className="experience-period">{exp.period}</p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`exp-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul className="experience-highlights">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="expand-indicator">
                  {isExpanded ? '−' : '+'}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
