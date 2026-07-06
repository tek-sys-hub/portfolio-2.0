import { socialLinks, personalInfo } from '../data/portfolio';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        {socialLinks.map((link) => (
          <a
            key={link.command}
            href={link.url}
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            open {link.command}
          </a>
        ))}
      </div>
      <p className="footer-copyright">
        <span className="comment">
          {'// '} Built by {personalInfo.name} | {new Date().getFullYear()} | Powered by caffeine & Linux
        </span>
      </p>
    </footer>
  );
};

export default Footer;
