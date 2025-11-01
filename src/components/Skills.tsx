import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section className="section" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">The Arsenal</h2>
      </motion.div>

      <div className="skills-container">
        <div className="skills-category">
          <h3>Languages</h3>
          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resumeData.skills.languages.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-hold"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="skills-category">
          <h3>Technologies</h3>
          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resumeData.skills.technologies.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-hold"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="skills-category">
          <h3>Tools</h3>
          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resumeData.skills.tools.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-hold"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
