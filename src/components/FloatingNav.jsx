import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KalpataruLogo from './KalpataruLogo';

/**
 * FloatingNav — Minimal floating navigation with heritage styling
 */
export default function FloatingNav({ items = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kalpataru-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('kalpataru-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => scrollTo('hero')}>
            <KalpataruLogo size={36} />
            <span className="nav-brand-text">Kalpataru</span>
          </div>

          {/* Desktop links */}
          <div className="nav-links-desktop">
            {items.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className={`ham-line ${isOpen ? 'open' : ''}`} />
            <span className={`ham-line ${isOpen ? 'open' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                className="mobile-link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button className="mobile-link theme-toggle-mobile" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .floating-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.4s var(--ease-out);
        }

        .floating-nav.scrolled {
          background: var(--bg-primary-alpha);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 20px rgba(35, 33, 30, 0.06);
          padding: 0.6rem 2rem;
        }

        .theme-toggle {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.4rem;
          margin-left: 0.5rem;
          transition: transform 0.3s ease;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
        }

        .theme-toggle-mobile {
          margin-top: 1rem;
          background: rgba(212, 175, 55, 0.1);
          text-align: center;
        }

        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
        }

        .nav-brand-text {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--green-deep);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: var(--green-deep);
          background: rgba(45, 90, 63, 0.06);
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
        }

        .ham-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .ham-line.open:first-child {
          transform: rotate(45deg) translateY(3.5px);
        }

        .ham-line.open:last-child {
          transform: rotate(-45deg) translateY(-3.5px);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          background: var(--bg-primary-alpha);
          backdrop-filter: blur(20px);
          z-index: 999;
          padding: 1rem 2rem 2rem;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .mobile-link {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          padding: 0.8rem 1rem;
          text-align: left;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }

        .mobile-link:hover {
          background: rgba(45, 90, 63, 0.06);
          color: var(--green-deep);
        }

        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
          .mobile-menu {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
