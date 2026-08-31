/**
 * CulturalMotifs — Subtle Indian heritage background decorations
 * Floating leaves, botanical patterns, organic shapes
 */
export default function CulturalMotifs() {
  return (
    <div className="cultural-motifs" aria-hidden="true">
      {/* Floating leaf particles */}
      <div className="motif-leaf motif-leaf-1">
        <svg width="30" height="50" viewBox="0 0 30 50" fill="none">
          <path d="M15 0 Q25 15 20 30 Q18 38 15 50 Q12 38 10 30 Q5 15 15 0Z" fill="var(--green-sage)" opacity="0.08" />
          <path d="M15 5 L15 45" stroke="var(--green-sage)" strokeWidth="0.5" opacity="0.06" />
        </svg>
      </div>
      <div className="motif-leaf motif-leaf-2">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <path d="M12 0 Q20 12 16 24 Q14 30 12 40 Q10 30 8 24 Q4 12 12 0Z" fill="var(--gold)" opacity="0.06" />
        </svg>
      </div>
      <div className="motif-leaf motif-leaf-3">
        <svg width="20" height="35" viewBox="0 0 20 35" fill="none">
          <path d="M10 0 Q18 10 14 20 Q12 26 10 35 Q8 26 6 20 Q2 10 10 0Z" fill="var(--green-emerald)" opacity="0.06" />
        </svg>
      </div>
      <div className="motif-leaf motif-leaf-4">
        <svg width="26" height="44" viewBox="0 0 26 44" fill="none">
          <path d="M13 0 Q22 13 18 26 Q16 34 13 44 Q10 34 8 26 Q4 13 13 0Z" fill="var(--terracotta)" opacity="0.04" />
        </svg>
      </div>

      {/* Subtle paisley-inspired curve */}
      <div className="motif-paisley">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path
            d="M100 20 Q160 50 160 100 Q160 150 100 180 Q80 170 70 150 Q60 130 70 110 Q80 90 100 80 Q110 75 115 85 Q120 95 110 105"
            stroke="var(--gold)"
            strokeWidth="0.8"
            opacity="0.06"
            fill="none"
          />
        </svg>
      </div>

      {/* Geometric mandala dots */}
      <div className="motif-dots">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * Math.PI * 2) / 8;
            const cx = 60 + Math.cos(angle) * 40;
            const cy = 60 + Math.sin(angle) * 40;
            return <circle key={i} cx={cx} cy={cy} r="2" fill="var(--gold)" opacity="0.05" />;
          })}
          <circle cx="60" cy="60" r="3" fill="var(--gold)" opacity="0.06" />
        </svg>
      </div>

      <style>{`
        .cultural-motifs {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .motif-leaf {
          position: absolute;
          animation: floatLeaf linear infinite;
        }

        .motif-leaf-1 {
          top: 10%;
          left: 5%;
          animation-duration: 20s;
          animation-delay: 0s;
        }

        .motif-leaf-2 {
          top: 30%;
          right: 8%;
          animation-duration: 25s;
          animation-delay: 3s;
        }

        .motif-leaf-3 {
          top: 60%;
          left: 3%;
          animation-duration: 22s;
          animation-delay: 7s;
        }

        .motif-leaf-4 {
          top: 80%;
          right: 5%;
          animation-duration: 18s;
          animation-delay: 5s;
        }

        .motif-paisley {
          position: absolute;
          top: 15%;
          right: -20px;
          animation: rotateSlow 60s linear infinite;
          opacity: 0.5;
        }

        .motif-dots {
          position: absolute;
          bottom: 10%;
          left: 2%;
          animation: rotateSlow 80s linear infinite reverse;
          opacity: 0.6;
        }

        @keyframes floatLeaf {
          0% {
            transform: translateY(0px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) rotate(15deg) translateX(10px);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(0px) rotate(-5deg) translateX(-5px);
            opacity: 0;
          }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .motif-leaf,
          .motif-paisley,
          .motif-dots {
            animation: none !important;
          }
        }

        @media (max-width: 768px) {
          .motif-paisley,
          .motif-dots {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
