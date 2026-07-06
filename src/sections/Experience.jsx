import TimelineItem from '../components/TimelineItem';
import { experience } from '../data/portfolio';
import './Experience.css';

const Experience = () => {
  return (
    <section className="section experience-section" id="experience">
      <h2 className="section-title">Experience</h2>

      <div className="experience-timeline">
        {experience.map((item, i) => (
          <TimelineItem key={item.hash} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
