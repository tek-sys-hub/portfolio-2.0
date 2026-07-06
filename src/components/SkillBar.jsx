import { useEffect, useRef, useState } from 'react';
import './SkillBar.css';

const SkillBar = ({ name, level }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-label">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-value">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className={`skill-bar-fill ${animated ? 'animated' : ''}`}
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
