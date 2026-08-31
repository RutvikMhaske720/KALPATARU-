import { motion } from 'framer-motion';
import KalpataruLogo from '../components/KalpataruLogo';

/**
 * Hero — Cinematic opening experience
 * "WELCOME TO KALPATARU" with large typography, cultural motifs, ambient animation
 */
export default function Hero({ brand }) {
  return (
    <section className="hero" id="hero" aria-label="Welcome to Kalpataru">
      {/* Background decorative elements */}
      <div className="hero-bg-elements" aria-hidden="true">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-circle hero-circle-3" />
        
        {/* Decorative Indian Motifs from uploaded sprite */}
        <div className="motif motif-parrot" />
        <div className="motif motif-peacock" />
        <div className="motif motif-elephant" />

        {/* Decorative botanical SVG border */}
        <svg className="hero-border-left" width="60" height="400" viewBox="0 0 60 400" fill="none">
          <path d="M30 0 Q35 50 25 100 Q15 150 30 200 Q45 250 25 300 Q15 350 30 400" stroke="var(--gold)" strokeWidth="0.6" opacity="0.12" />
          {[50, 120, 200, 280, 360].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 20 : 40} cy={y} rx="8" ry="5" fill="var(--green-sage)" opacity="0.06" transform={`rotate(${i * 20}, ${i % 2 === 0 ? 20 : 40}, ${y})`} />
          ))}
        </svg>
        <svg className="hero-border-right" width="60" height="400" viewBox="0 0 60 400" fill="none">
          <path d="M30 0 Q25 50 35 100 Q45 150 30 200 Q15 250 35 300 Q45 350 30 400" stroke="var(--gold)" strokeWidth="0.6" opacity="0.12" />
          {[50, 120, 200, 280, 360].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 40 : 20} cy={y} rx="8" ry="5" fill="var(--green-sage)" opacity="0.06" transform={`rotate(${-i * 20}, ${i % 2 === 0 ? 40 : 20}, ${y})`} />
          ))}
        </svg>
      </div>

      <div className="hero-content">
        {/* Welcome text */}
        <motion.div
          className="hero-text-group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="hero-welcome-label"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Welcome to
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {brand?.name || 'Kalpataru'}
          </motion.h1>

          <motion.div
            className="hero-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {brand?.tagline || 'Empowering Indian Artisans Through Digital Transformation'}
          </motion.p>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {brand?.subtitle || 'Where ancient craftsmanship meets modern technology'}
          </motion.p>
        </motion.div>

        {/* Logo in top-right */}
        <motion.div
          className="hero-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <KalpataruLogo size={350} />
          <motion.a 
            href="/kalpataru.apk"
            download="Kalpataru.apk"
            className="apk-download-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Download APK
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="scroll-line" />
        <span className="scroll-text">Scroll to discover</span>
      </motion.div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 4rem 2rem;
          background: linear-gradient(
            180deg,
            var(--bg-primary) 0%,
            var(--bg-secondary) 40%,
            var(--bg-accent) 100%
          );
        }

        .hero-bg-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          opacity: 0.05;
        }

        .hero-circle-1 {
          width: 600px;
          height: 600px;
          top: -200px;
          right: -100px;
          border-color: var(--gold);
          animation: circleFloat 20s ease-in-out infinite alternate;
        }

        .hero-circle-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          left: -100px;
          border-color: var(--green-emerald);
          animation: circleFloat 25s ease-in-out infinite alternate-reverse;
        }

        .hero-circle-3 {
          width: 200px;
          height: 200px;
          top: 30%;
          left: 20%;
          border-color: var(--terracotta);
          animation: circleFloat 15s ease-in-out infinite alternate;
        }

        .hero-border-left {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .hero-border-right {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* ── Floating Indian Motifs ── */
        .motif {
          position: absolute;
          width: 200px;
          height: 200px;
          background-image: url('/assets/images/indian-motifs.png');
          background-size: 300% auto;
          background-repeat: no-repeat;
          
          /* Force beige background to pure white, keep lines black */
          filter: grayscale(1) contrast(3) brightness(1.3);
          mix-blend-mode: multiply;
          opacity: 0.12; /* Subtle watermark */
          z-index: 0;
          pointer-events: none;
        }

        [data-theme='dark'] .motif {
          /* Invert to make lines white, background black, then screen */
          filter: grayscale(1) contrast(3) brightness(1.3) invert(1);
          mix-blend-mode: screen;
          opacity: 0.12;
        }

        .motif-parrot {
          background-position: left center;
          bottom: 10%;
          right: 8%;
          animation: motifFloat 12s ease-in-out infinite alternate;
        }

        .motif-peacock {
          background-position: center center;
          top: 15%;
          left: 10%;
          width: 180px;
          height: 180px;
          animation: motifFloat 15s ease-in-out infinite alternate-reverse;
        }

        .motif-elephant {
          background-position: right center;
          bottom: 12%;
          left: 8%;
          width: 220px;
          height: 220px;
          animation: motifFloat 18s ease-in-out infinite alternate;
        }

        @keyframes motifFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(2deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
        }

        .hero-text-group {
          text-align: center;
          flex: 1;
        }

        .hero-welcome-label {
          font-family: var(--font-body);
          font-size: clamp(0.8rem, 1.5vw, 1rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--green-deep);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--green-deep) 0%, var(--green-forest) 40%, var(--gold-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-divider {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 0 auto 1.5rem;
          transform-origin: center;
        }

        .hero-tagline {
          font-family: var(--font-heading);
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 400;
          font-style: italic;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto 0.8rem;
          line-height: 1.6;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .hero-logo {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .apk-download-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--bg-primary);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .apk-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          background: transparent;
          color: var(--gold-dark);
          border-color: var(--gold);
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .scroll-text {
          font-family: var(--font-body);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-light);
        }

        @keyframes circleFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -20px) scale(1.05); }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 0.8; transform: scaleY(1); }
        }

        @media (max-width: 900px) {
          .hero-content {
            flex-direction: column-reverse;
            gap: 2rem;
          }
          .hero-logo {
            margin-bottom: -1rem;
          }
          .hero-border-left,
          .hero-border-right {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 6rem 1.5rem 3rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-circle,
          .scroll-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
