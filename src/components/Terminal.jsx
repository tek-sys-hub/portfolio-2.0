import { motion } from 'framer-motion';
import './Terminal.css';

const Terminal = ({ title = 'bash', children, className = '' }) => {
  return (
    <motion.div
      className={`terminal-window ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="terminal-header">
        <span className="terminal-header-user">tek@linux</span>
        <span className="terminal-header-separator">:</span>
        <span className="terminal-header-path">~</span>
        <span className="terminal-header-prompt">$ {title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </motion.div>
  );
};

export default Terminal;
