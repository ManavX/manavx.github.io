import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { resumeData } from '../data/resumeData';

export function HorizontalProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['5%', `-${resumeData.projects.length * 22}%`]
  );

  return (
    <section ref={containerRef} className="horizontal-section">
      <div className="sticky-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Strategic Moves</h2>
          <p className="section-subtitle">Projects ranked by complexity — each a calculated gambit</p>
        </motion.div>

        <motion.div className="horizontal-scroll-container" style={{ x }}>
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              className="horizontal-project-card"
              style={{ '--project-color': project.color } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="project-dual-rank">
                <span className="chess-rank" title="Chess Skill Level">
                  ♔ {project.chessRank}
                </span>
              </div>

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

              <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
