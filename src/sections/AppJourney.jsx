import { motion } from 'framer-motion';
import ScreenCard from '../components/ScreenCard';
import FlowConnector from '../components/FlowConnector';

/**
 * AppJourney — Interactive 10-screen app flow diagram
 * Rows: 1-3, 4-6, 7-9, then 10 (BAZAR) standalone
 */
export default function AppJourney({ screens, journey }) {
  if (!screens || screens.length < 10) return null;

  const rows = [
    screens.slice(0, 3),   // Row 1: screens 1-3
    screens.slice(3, 6),   // Row 2: screens 4-6
    screens.slice(6, 9),   // Row 3: screens 7-9
  ];
  const bazarScreen = screens[9]; // Screen 10

  return (
    <section className="app-journey section" id="journey" aria-label="Kalpataru App Journey">
      {/* Section header */}
      <motion.div
        className="journey-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-divider" />
        <h2 className="heading-section">{journey?.title || 'Kalpataru App Journey'}</h2>
        <p className="journey-subtitle">{journey?.subtitle || 'Follow the path of digital transformation'}</p>
      </motion.div>

      {/* Flow rows */}
      <div className="journey-flow">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            {/* Screen row */}
            <div className="journey-row">
              {row.map((screen, colIndex) => (
                <div className="journey-row-item" key={screen.id}>
                  <ScreenCard
                    screen={screen}
                    index={rowIndex * 3 + colIndex}
                  />
                  {colIndex < 2 && (
                    <div className="journey-connector-h">
                      <FlowConnector type="horizontal" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Vertical connector between rows */}
            {rowIndex < 2 && (
              <div className="journey-connector-v">
                <FlowConnector type="vertical" />
              </div>
            )}
          </div>
        ))}

        {/* Vertical connector to BAZAR */}
        <div className="journey-connector-v">
          <FlowConnector type="vertical" />
        </div>

        {/* BAZAR — Screen 10 standalone */}
        <motion.div
          className="journey-bazar"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="bazar-glow" aria-hidden="true" />
          <ScreenCard
            screen={bazarScreen}
            index={9}
            scale={1.1}
          />
          <div className="bazar-badge">
            <span>🏪</span>
            <span>The Marketplace</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .app-journey {
          padding-top: var(--space-3xl);
          padding-bottom: var(--space-3xl);
        }

        .journey-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .journey-subtitle {
          font-family: var(--font-heading);
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          font-style: italic;
          color: var(--text-muted);
          margin-top: 0.8rem;
        }

        .journey-flow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .journey-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: nowrap;
        }

        .journey-row-item {
          display: flex;
          align-items: center;
        }

        .journey-connector-h {
          margin: 0 0.5rem;
        }

        .journey-connector-v {
          display: flex;
          justify-content: center;
          padding: 0.5rem 0;
        }

        .journey-bazar {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-lg);
        }

        .bazar-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          animation: bazarPulse 4s ease-in-out infinite alternate;
        }

        .bazar-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.8rem;
          padding: 0.5rem 1.2rem;
          background: linear-gradient(135deg, var(--green-deep), var(--green-forest));
          border-radius: 20px;
          color: var(--gold-light);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(13, 40, 24, 0.3);
        }

        @keyframes bazarPulse {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        /* Responsive: tablet 2 per row, mobile 1 per row */
        @media (max-width: 900px) {
          .journey-row {
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }
          .journey-connector-h {
            display: none;
          }
          .journey-row-item {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .journey-row {
            flex-direction: column;
            gap: 0;
          }
          .journey-row-item {
            flex-direction: column;
          }
          .journey-row-item::after {
            content: '';
            display: block;
            width: 1px;
            height: 30px;
            background: linear-gradient(to bottom, var(--gold), transparent);
            margin: 0.5rem auto;
          }
          .journey-row-item:last-child::after {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bazar-glow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
