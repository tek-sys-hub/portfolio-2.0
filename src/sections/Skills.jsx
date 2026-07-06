import { motion } from 'framer-motion';
import SkillBar from '../components/SkillBar';
import { skills } from '../data/portfolio';
import './Skills.css';

const Skills = () => {
  return (
    <section className="section skills-section" id="skills">
      <h2 className="section-title">Skills & Tools</h2>

      {/* Skill Bars */}
      <div className="skills-grid">
        <motion.div
          className="skills-category"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="skills-category-title">Languages</h3>
          {skills.languages.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} />
          ))}
        </motion.div>

        <motion.div
          className="skills-category"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="skills-category-title">Frameworks</h3>
          {skills.frameworks.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} />
          ))}
        </motion.div>

        <motion.div
          className="skills-category"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="skills-category-title">DevOps & Tools</h3>
          {skills.tools.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
