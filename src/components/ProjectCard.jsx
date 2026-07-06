import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="project-listing">
        <span className="permissions">drwxr-xr-x</span>
        <span className="size">{project.size}</span>
        <span className="date">{project.date}</span>
        <span className="name">{project.name}/</span>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="project-tech-tag">{t}</span>
        ))}
      </div>

      <div className="project-links">
        {project.github && (
          <a href={project.github} className="project-button repo-button" target="_blank" rel="noopener noreferrer">
            Repository
          </a>
        )}
        {project.live && typeof project.live === 'string' && (
          <a href={project.live} className="project-button live-button" target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
