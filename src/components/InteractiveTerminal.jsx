import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, skills, socialLinks, aboutText, projects } from '../data/portfolio';
import './InteractiveTerminal.css';
import './Terminal.css';

const COMMANDS = {
  help: () =>
    `Available commands:
  about         About me
  skills        My technical skills
  projects      My projects
  socials       My social links
  whoami        Who am I?
  neofetch      System fetch
  uname         System info
  ls            List sections
  cat [file]    Read a file (about.txt, README.md)
  pwd           Print working directory
  hostname      Show hostname
  date          Current date
  echo [text]   Echo text
  clear         Clear terminal
  goto [section]  Jump to a section (skills, projects, contact)`,

  about: () => aboutText.join('\n'),

  whoami: () => `${personalInfo.name} ${personalInfo.title}`,

  uname: () => `Linux tek-portfolio 6.8.0 #1 SMP x86_64 GNU/Linux`,

  pwd: () => `/home/tek/portfolio`,

  hostname: () => `tek-portfolio`,

  date: () => new Date().toString(),

  ls: () => `about.txt    skills/    projects/    contact/    socials/    README.md`,

  skills: () => {
    const langs = skills.languages.map(s => `  ${s.name.padEnd(22)} ${'█'.repeat(Math.floor(s.level / 5))}${'░'.repeat(20 - Math.floor(s.level / 5))} ${s.level}%`).join('\n');
    const frameworks = skills.frameworks.map(s => `  ${s.name.padEnd(22)} ${'█'.repeat(Math.floor(s.level / 5))}${'░'.repeat(20 - Math.floor(s.level / 5))} ${s.level}%`).join('\n');
    const tools = skills.tools.map(s => `  ${s.name.padEnd(22)} ${'█'.repeat(Math.floor(s.level / 5))}${'░'.repeat(20 - Math.floor(s.level / 5))} ${s.level}%`).join('\n');
    return `── Languages ──\n${langs}\n\n── Frameworks ──\n${frameworks}\n\n── Tools ──\n${tools}`;
  },

  projects: () => {
    return projects.map(p =>
      `  drwxr-xr-x  ${p.size.padEnd(6)}  ${p.date.padEnd(14)}  📁 ${p.name}/\n    └─ ${p.description}\n       [${p.tech.join(', ')}]`
    ).join('\n\n');
  },

  socials: () =>
    socialLinks.map(l => `  ${l.label.padEnd(12)} → ${l.url}`).join('\n'),

  neofetch: () =>
    `      /\\         tek@portfolio
     /  \\        ─────────────────
    /\\   \\       OS:        Linux
   /  ..  \\      Shell:     ${skills.os.shell}
  /  '  '  \\     Editor:    ${skills.os.editor}
 / ..'  '.. \\    Terminal:  ${skills.os.terminal}
/____________\\   Name:      ${personalInfo.name}
                 Role:      ${personalInfo.title}
                 Location:  ${personalInfo.location}
                 Status:    ● available`,

  contact: () =>
    `  ── Contact Info ──
  Email:     ${personalInfo.email}
  GitHub:    ${personalInfo.github}
  LinkedIn:  ${personalInfo.linkedin}

  Or scroll down to the contact form below.`,
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: `Welcome to tek@portfolio type "help" for commands.\n` },
    { type: 'command', text: 'cat about.txt' },
    { type: 'output', text: aboutText.join('\n') },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleGoto = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return `Jumping to ${section}...`;
    }
    return `Section "${section}" not found. Available: skills, projects, contact`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'command', text: trimmed }];
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output;
    let isError = false;

    if (cmd === 'echo') {
      output = args || '';
    } else if (cmd === 'cat') {
      if (args === 'about.txt') {
        output = aboutText.join('\n');
      } else if (args === 'README.md' || args === 'readme.md') {
        output = `# ${personalInfo.name}\n${personalInfo.title}\n${personalInfo.subtitle}\n\nType 'help' for available commands.`;
      } else if (!args) {
        output = 'cat: missing file operand';
        isError = true;
      } else {
        output = `cat: ${args}: No such file or directory`;
        isError = true;
      }
    } else if (cmd === 'goto' || cmd === 'cd') {
      if (!args) {
        output = 'Usage: goto [section]\nAvailable: skills, projects, contact';
      } else {
        output = handleGoto(args);
      }
    } else if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else {
      output = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
      isError = true;
    }

    newHistory.push({ type: isError ? 'error' : 'output', text: output });
    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.toLowerCase();
      const allCmds = [...Object.keys(COMMANDS), 'goto', 'cd', 'echo', 'cat'];
      const match = allCmds.find(c => c.startsWith(partial));
      if (match) setInput(match);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <section className="section" id="about">
      <div className="section-command">
        <span className="prompt">$</span>
        <span className="command">bash</span>
        <span className="flag">--interactive</span>
      </div>

      <motion.div
        className="interactive-terminal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-window" onClick={focusInput}>
          <div className="terminal-header">
            <span className="terminal-header-user">tek@linux</span>
            <span className="terminal-header-separator">:</span>
            <span className="terminal-header-path">~/portfolio</span>
            <span className="terminal-header-prompt">$ bash --interactive</span>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            <div className="interactive-history">
              {history.map((item, i) => (
                <div key={i} className="interactive-history-line">
                  {item.type === 'command' && (
                    <>
                      <span className="prompt-text">tek@portfolio:~$ </span>
                      <span className="cmd-text">{item.text}</span>
                    </>
                  )}
                  {item.type === 'output' && (
                    <span className="output-text">{item.text}</span>
                  )}
                  {item.type === 'error' && (
                    <span className="error-text">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            <form className="interactive-input-line" onSubmit={handleSubmit}>
              <span className="prompt-text">tek@portfolio:~$&nbsp;</span>
              <input
                ref={inputRef}
                className="interactive-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>

            <div className="interactive-hint">
              Try: <span>help</span> · <span>skills</span> · <span>projects</span> · <span>neofetch</span> · <span>goto projects</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InteractiveTerminal;
