import { motion } from 'framer-motion';
import AndroidFrame from '../components/AndroidFrame';
import { Shield, Award } from 'lucide-react';

/**
 * GovernmentSchemes — Screen 11 on the left with scheme titles beside it
 */
export default function GovernmentSchemes({ data }) {
  if (!data) return null;

  return (
    <section className="gov-schemes section" id="schemes" aria-label="Government Schemes">
      {/* Decorative border */}
      <div className="gov-border-top" aria-hidden="true" />

      <motion.div
        className="gov-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-divider" />
        <h2 className="heading-section">{data.title}</h2>
        {data.subtitle && (
          <p className="gov-subtitle">{data.subtitle}</p>
        )}
      </motion.div>

      <div className="gov-content">
        {/* Left: Android frame */}
        <motion.div
          className="gov-phone"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AndroidFrame image={data.image} title="" index={0} />
        </motion.div>

        {/* Right: scheme items */}
        <motion.div
          className="gov-info"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="gov-items">
            {data.items?.map((item, i) => (
              <div className="gov-item" key={i}>
                <div className="gov-item-icon">
                  {i === 0 ? <Shield size={24} /> : <Award size={24} />}
                </div>
                <div className="gov-item-text">
                  <h3>{item}</h3>
                  <p>Supporting artisan welfare and digital empowerment</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gov-tagline">
            <p>Connecting artisans with opportunities, government initiatives and digital support.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .gov-schemes {
          position: relative;
        }

        .gov-border-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(90%, 800px);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-pale), transparent);
        }

        .gov-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .gov-subtitle {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-style: italic;
          color: var(--text-muted);
          margin-top: 0.6rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .gov-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2xl);
          max-width: 900px;
          margin: 0 auto;
        }

        .gov-phone {
          flex-shrink: 0;
        }

        .gov-info {
          flex: 1;
          max-width: 400px;
        }

        .gov-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .gov-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.2rem;
          background: linear-gradient(135deg, rgba(250, 247, 242, 0.8), rgba(237, 228, 216, 0.5));
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--radius-lg);
          transition: all 0.3s var(--ease-out);
        }

        .gov-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .gov-item-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--green-deep), var(--green-forest));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-light);
          flex-shrink: 0;
        }

        .gov-item-text h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--green-deep);
          margin-bottom: 0.3rem;
        }

        .gov-item-text p {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .gov-tagline {
          padding: 1rem;
          border-left: 2px solid var(--gold);
        }

        .gov-tagline p {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .gov-content {
            flex-direction: column;
            gap: var(--space-xl);
          }
          .gov-info {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
