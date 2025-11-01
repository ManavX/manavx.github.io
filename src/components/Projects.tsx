import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

export function Projects() {
  return (
    <section className="section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Climbing Routes</h2>
        <p className="section-subtitle">Projects graded by complexity and challenge</p>
      </motion.div>

      <div className="projects-container">
        <div className="projects-grid">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              style={{ '--project-color': project.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="project-header">
                <div>
                  <h3>{project.name}</h3>
                  <p className="project-period">{project.period}</p>
                </div>
              </div>

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
        </div>
      </div>
    </section>
  );
}
