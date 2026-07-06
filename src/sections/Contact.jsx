import { useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from '../components/Terminal';
import { socialLinks } from '../data/portfolio';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email sending integration will be added later.
  };

  return (
    <section className="section contact-section" id="contact">
      <h2 className="section-title">Get in Touch</h2>

      <div className="contact-terminal">
        <Terminal title="Contact">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-name">Name</label>
              <input
                className="contact-input"
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-email">Email</label>
              <input
                className="contact-input"
                type="email"
                id="contact-email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-message">Message</label>
              <textarea
                className="contact-textarea"
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button className="contact-submit" type="submit">
              Send Message
            </button>
          </form>
        </Terminal>

        <div className="contact-or">or reach out directly</div>

        <motion.div
          className="contact-direct-links"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.command}
              href={link.url}
              className="contact-direct-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
