import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AndroidFrame — Realistic Android phone mockup frame
 * Props: image, title, index (for stagger), scale (default 1)
 */
export default function AndroidFrame({ image, title, index = 0, scale = 1 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="android-frame-wrapper"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ '--frame-scale': scale }}
    >
      <div className="android-frame">
        {/* Phone body */}
        <div className="phone-body">
          {/* Top speaker / camera area */}
          <div className="phone-notch">
            <div className="phone-camera" />
            <div className="phone-speaker" />
          </div>

          {/* Screen area */}
          <div className="phone-screen">
            {!imageLoaded && !imageError && (
              <div className="phone-screen-placeholder">
                <div className="loading-shimmer" />
              </div>
            )}
            {imageError ? (
              <div className="phone-screen-error">
                <span>📱</span>
              </div>
            ) : (
              <img
                src={image}
                alt={title || 'App screen'}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`phone-screen-img ${imageLoaded ? 'loaded' : ''}`}
              />
            )}

            {/* Glass reflection */}
            <div className="phone-reflection" />
          </div>
        </div>
      </div>

      {/* Title below phone */}
      {title && (
        <p className="android-frame-title">{title}</p>
      )}

      <style>{`
        .android-frame-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transform: scale(var(--frame-scale, 1));
        }

        .android-frame {
          perspective: 800px;
          transition: transform 0.5s var(--ease-out);
        }

        .android-frame:hover {
          transform: scale(1.03) translateY(-8px);
        }

        .android-frame:hover .phone-body {
          box-shadow:
            0 25px 70px rgba(35, 33, 30, 0.3),
            0 10px 25px rgba(35, 33, 30, 0.15),
            0 0 40px rgba(212, 175, 55, 0.08);
        }

        .android-frame:hover .phone-reflection {
          opacity: 0.12;
        }

        .phone-body {
          width: 220px;
          background: linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 50%, #111111 100%);
          border-radius: var(--radius-phone);
          padding: 10px 10px 14px 10px;
          box-shadow: var(--shadow-phone);
          position: relative;
          transition: box-shadow 0.5s var(--ease-out);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Subtle metallic edge */
        .phone-body::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: calc(var(--radius-phone) + 1px);
          background: linear-gradient(145deg, rgba(255,255,255,0.12), transparent 40%, rgba(255,255,255,0.04));
          z-index: 0;
          pointer-events: none;
        }

        .phone-notch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 0 8px;
          position: relative;
          z-index: 2;
        }

        .phone-camera {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #3A3A3A, #1A1A1A);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .phone-speaker {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          background: #2A2A2A;
        }

        .phone-screen {
          width: 100%;
          aspect-ratio: 9 / 19.5;
          border-radius: calc(var(--radius-phone) - 10px);
          overflow: hidden;
          position: relative;
          background: #000;
          z-index: 1;
        }

        .phone-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .phone-screen-img.loaded {
          opacity: 1;
        }

        .phone-screen-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-shimmer {
          width: 60%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .phone-screen-error {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          font-size: 2rem;
        }

        .phone-reflection {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.03) 100%
          );
          pointer-events: none;
          opacity: 0.06;
          transition: opacity 0.5s var(--ease-out);
          z-index: 3;
        }

        .android-frame-title {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          max-width: 200px;
          line-height: 1.4;
          letter-spacing: 0.02em;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .phone-body {
            width: 180px;
          }
        }

        @media (max-width: 480px) {
          .phone-body {
            width: 200px;
          }
        }
      `}</style>
    </motion.div>
  );
}
