import { motion } from 'framer-motion';
import './TimelineItem.css';

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      <div className="timeline-hash">{item.hash}</div>
      <div className="timeline-content">
        <div className="timeline-header">
          <span className="timeline-role">{item.role}</span>
          <span className="timeline-branch">{item.branch}</span>
        </div>
        <div className="timeline-company">{item.company}</div>
        <div className="timeline-date">{item.date}</div>
        <p className="timeline-description">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
