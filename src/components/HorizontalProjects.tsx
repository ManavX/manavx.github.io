import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { resumeData } from '../data/resumeData';

export function HorizontalProjects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="projects-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Projects</h2>
      </motion.div>

      <div className="projects-grid-container">
          {resumeData.projects.map((project, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={`project-wrapper-${index}`}
                className={`horizontal-project-card ${isExpanded ? 'expanded' : ''}`}
                style={{ '--project-color': project.color } as React.CSSProperties}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(index);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <h3>{project.name}</h3>
                  <p className="project-period">{project.period}</p>

                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="project-description">{project.description}</p>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key={`content-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <ul className="project-highlights">
                          {project.highlights.map((highlight, i) => (
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
