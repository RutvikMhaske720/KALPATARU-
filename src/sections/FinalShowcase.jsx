import { motion } from 'framer-motion';
import AndroidFrame from '../components/AndroidFrame';
import { Sparkles } from 'lucide-react';

/**
 * FinalShowcase — Screen 13 on the right as concluding visual
 */
export default function FinalShowcase({ data }) {
  if (!data) return null;

  return (
    <section className="final-showcase section" aria-label="The Kalpataru Experience">
      <div className="bg-decor" aria-hidden="true">
        <div className="decor-img decor-3" />
      </div>
      <div className="final-border" aria-hidden="true" />

      <div className="final-content">
        {/* Left: concluding text */}
        <motion.div
          className="final-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="final-icon">
            <Sparkles size={28} />
          </div>
          <h2 className="final-title">
            {data.title || 'The Kalpataru Experience'}
          </h2>
          <div className="final-divider" />
          <p className="final-subtitle">
            {data.subtitle || 'A complete digital ecosystem designed for India\'s artisans — from creation to marketplace, from tradition to transformation.'}
          </p>

          <div className="final-journey-summary">
            <div className="journey-step">
              <span className="step-dot" />
              <span>Artisan Onboarding</span>
            </div>
            <div className="journey-step">
              <span className="step-dot" />
              <span>Voice & Language</span>
            </div>
            <div className="journey-step">
              <span className="step-dot" />
              <span>AI-Powered Catalogue</span>
            </div>
            <div className="journey-step">
              <span className="step-dot" />
              <span>Smart Pricing</span>
            </div>
            <div className="journey-step">
              <span className="step-dot" />
              <span>Digital Marketplace</span>
            </div>
            <div className="journey-step">
              <span className="step-dot" />
              <span>Government Support</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Android frame with screen 13 */}
        <motion.div
          className="final-phone"
          initial={{ opacity: 0, x: 40, rotateY: -5 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="final-glow" aria-hidden="true" />
          <AndroidFrame image={data.image} title="" index={0} />
        </motion.div>
      </div>

      <style>{`
        .final-showcase {
          position: relative;
          overflow: hidden;
        }

        .bg-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .decor-img {
          position: absolute;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.15;
          mix-blend-mode: multiply;
          border-radius: 50%;
          filter: grayscale(0.1) contrast(1.1);
        }

        [data-theme='dark'] .decor-img {
          mix-blend-mode: screen;
          filter: grayscale(0.1) contrast(1.1) invert(0.85);
          opacity: 0.12;
        }

        .decor-3 {
          width: 400px;
          height: 400px;
          top: 100px;
          left: -150px;
          background-image: url('/assets/images/decor3.jpg');
          animation: floatDecor3 30s ease-in-out infinite alternate;
        }

        @keyframes floatDecor3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { transform: translate(50px, -30px) rotate(20deg) scale(1.1); }
        }

        .final-border {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(90%, 800px);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-pale), transparent);
        }

        .final-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2xl);
          max-width: 950px;
          margin: 0 auto;
        }

        .final-text {
          flex: 1;
          max-width: 420px;
        }

        .final-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .final-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 600;
          color: var(--green-deep);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .final-divider {
          width: 50px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 1rem;
          border-radius: 1px;
        }

        .final-subtitle {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .final-journey-summary {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .journey-step {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }

        .final-phone {
          flex-shrink: 0;
          position: relative;
          perspective: 800px;
        }

        .final-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        @media (max-width: 768px) {
          .final-content {
            flex-direction: column-reverse;
            gap: var(--space-xl);
          }
          .final-text {
            max-width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .final-journey-summary {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
