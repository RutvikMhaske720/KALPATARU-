/**
 * KalpataruLogo — Golden ornate Kalpataru tree logo
 * Uses the actual brand logo image with subtle living animation
 */
export default function KalpataruLogo({ size = 120 }) {
  return (
    <div className="kalpataru-logo-wrap" aria-label="Kalpataru Logo">
      <div className="logo-glow" aria-hidden="true" />

      <img
        src="/assets/images/kalpataru-logo-transparent.png"
        alt="Kalpataru — The wish-fulfilling tree with peacocks, artisan tools, and traditional craft symbols"
        width={size}
        height={size}
        className="kalpataru-logo-img"
        draggable="false"
      />

      <style>{`
        .kalpataru-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .kalpataru-logo-wrap:hover {
          transform: scale(1.05);
        }

        .kalpataru-logo-wrap:hover .logo-glow {
          opacity: 0.4;
          transform: translate(-50%, -50%) scale(1.2);
        }

        .kalpataru-logo-wrap:hover .kalpataru-logo-img {
          filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.4));
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.2;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 0;
          animation: logoGlowPulse 4s ease-in-out infinite alternate;
        }

        .kalpataru-logo-img {
          position: relative;
          z-index: 1;
          object-fit: contain;
          border-radius: 8px;
          animation: logoFloat 6s ease-in-out infinite alternate;
          transition: filter 0.5s ease;
          
          /* The logo is now a true transparent PNG, so no complex CSS filters needed! */
          filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.2));
        }

        /* Dark Mode adjustments (optional) */
        [data-theme='dark'] .kalpataru-logo-img {
          filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.4));
        }

        @keyframes logoFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(0.3deg);
          }
          100% {
            transform: translateY(1px) rotate(-0.3deg);
          }
        }

        @keyframes logoGlowPulse {
          0% {
            opacity: 0.12;
            transform: translate(-50%, -50%) scale(0.95);
          }
          100% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kalpataru-logo-img,
          .logo-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
