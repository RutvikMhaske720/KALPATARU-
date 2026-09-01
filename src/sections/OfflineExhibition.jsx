import { motion } from 'framer-motion';
import AndroidFrame from '../components/AndroidFrame';
import { MapPin, Calendar } from 'lucide-react';

/**
 * OfflineExhibition — Asymmetric editorial layout with Screen 12 on right
 */
export default function OfflineExhibition({ data }) {
  if (!data) return null;

  return (
    <section className="offline-exhibition section" id="exhibition" aria-label="Offline Exhibition">
      <div className="bg-decor" aria-hidden="true">
        <div className="decor-img decor-1" />
      </div>
      <motion.div
        className="exhibition-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-divider" />
        <h2 className="heading-section">{data.title}</h2>
      </motion.div>

      <div className="exhibition-content">
        {/* Left: Text content */}
        <motion.div
          className="exhibition-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="exhibition-text-title">
            Bridging Digital & Physical
          </h3>
          <p className="exhibition-description">
            {data.description || 'Stay informed about local exhibitions, melas, and craft fairs. Kalpataru brings offline opportunities to your fingertips, ensuring no artisan misses a chance to showcase their craft.'}
          </p>

          <div className="exhibition-features">
            <div className="exhibition-feature">
              <MapPin size={20} />
              <span>Discover nearby exhibitions and melas</span>
            </div>
            <div className="exhibition-feature">
              <Calendar size={20} />
              <span>Real-time event updates and schedules</span>
            </div>
          </div>

          {data.subtitle && (
            <p className="exhibition-sub">{data.subtitle}</p>
          )}
        </motion.div>

        {/* Right: Android frame */}
        <motion.div
          className="exhibition-phone"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AndroidFrame image={data.image} title={data.title} index={0} />
        </motion.div>
      </div>

      <style>{`
        .offline-exhibition {
          position: relative;
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
          filter: grayscale(0.3) contrast(1.2);
        }

        [data-theme='dark'] .decor-img {
          mix-blend-mode: screen;
          filter: grayscale(0.3) contrast(1.2) invert(0.8);
          opacity: 0.1;
        }

        .decor-1 {
          width: 450px;
          height: 450px;
          top: -100px;
          left: -150px;
          background-image: url('/assets/images/decor2.jpg');
          animation: floatDecor 25s ease-in-out infinite alternate;
        }

        @keyframes floatDecor {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { transform: translate(40px, 40px) rotate(15deg) scale(1.05); }
        }

        .exhibition-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .exhibition-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2xl);
          max-width: 950px;
          margin: 0 auto;
        }

        .exhibition-text {
          flex: 1;
          max-width: 420px;
        }

        .exhibition-text-title {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 600;
          color: var(--green-deep);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .exhibition-description {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .exhibition-features {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .exhibition-feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding: 0.6rem 1rem;
          background: rgba(45, 90, 63, 0.04);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--green-emerald);
        }

        .exhibition-feature svg {
          color: var(--green-emerald);
          flex-shrink: 0;
        }

        .exhibition-sub {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .exhibition-phone {
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .exhibition-content {
            flex-direction: column-reverse;
            gap: var(--space-xl);
          }
          .exhibition-text {
            max-width: 100%;
            text-align: center;
          }
          .exhibition-feature {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
