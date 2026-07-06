import { useState, useEffect } from 'react';
import './Navbar.css';

const sections = [
  { id: 'hero', label: '~/' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  // { id: 'experience', label: 'experience' }, // Uncomment when you have experience
  { id: 'contact', label: 'contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-path">
        <span className="user">tek</span>
        <span className="separator">@</span>
        <span className="dir">portfolio</span>
        <span className="separator">:</span>
        <span className="dir">~</span>
        <span className="separator">$</span>
      </div>

      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? '[x]' : '[≡]'}
      </button>

      <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              className={`nav-link ${active === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
              role="button"
              tabIndex={0}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
