import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

export function Experience() {
  return (
    <section className="section" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Career Endgame</h2>
        <p className="section-subtitle">Strategic positions played in the professional arena</p>
      </motion.div>

      <div className="experience-container">
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="experience-header">
              <div>
                <h3>{exp.company}</h3>
                <p className="experience-role">{exp.role}</p>
                <p className="experience-period">{exp.period}</p>
              </div>
            </div>

            <ul className="experience-highlights">
              {exp.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
