import KalpataruLogo from '../components/KalpataruLogo';

/**
 * Footer — Artisan digital tribute footer
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <KalpataruLogo size={80} />
          <div>
            <p className="footer-name">Kalpataru</p>
            <p className="footer-tagline">Empowering Indian Artisans</p>
          </div>
        </div>

        <div className="footer-divider" />

        <p className="footer-copy">
          &copy; {year} Kalpataru. Crafted for India's artisans.
        </p>

        <p className="footer-sub">
          Where tradition meets technology. Every craft tells a story.
        </p>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: linear-gradient(180deg, var(--bg-primary), var(--bg-accent));
          padding: var(--space-2xl) var(--space-lg) var(--space-xl);
          border-top: 1px solid rgba(212, 175, 55, 0.1);
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          text-align: center;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--green-deep);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-tagline {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .footer-divider {
          width: 40px;
          height: 1px;
          background: var(--gold);
          margin: 0.5rem 0;
        }

        .footer-copy {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .footer-sub {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-style: italic;
          color: var(--text-light);
        }
      `}</style>
    </footer>
  );
}
