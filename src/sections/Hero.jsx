import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TypeWriter from '../components/TypeWriter';
import { personalInfo } from '../data/portfolio';
import './Hero.css';

const Hero = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-name">{personalInfo.name}</h1>
            <div className="hero-title">
              <TypeWriter
                text={personalInfo.title}
                speed={50}
                showCursor={false}
              />
            </div>
            <div className="hero-subtitle">
              <TypeWriter
                text={personalInfo.subtitle}
                speed={30}
                delay={800}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <a className="hero-prompt" onClick={scrollToAbout} role="button" tabIndex={0}>
                <span className="prompt-symbol">→</span>
                <span>Explore my work</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>

      {ready && (
        <div className="hero-scroll-hint">
          ↓ scroll ↓
        </div>
      )}
    </section>
  );
};

export default Hero;
