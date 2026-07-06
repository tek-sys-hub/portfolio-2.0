import { useState, useEffect } from 'react';

const TypeWriter = ({
  text,
  speed = 40,
  delay = 0,
  onComplete,
  showCursor = true,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !done && <span className="terminal-cursor" />}
    </span>
  );
};

export default TypeWriter;
