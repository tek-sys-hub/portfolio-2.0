import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/portfolio';
import './Projects.css';

const Projects = () => {
  return (
    <section className="section projects-section" id="projects">
      <h2 className="section-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
