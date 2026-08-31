import AndroidFrame from './AndroidFrame';

/**
 * ScreenCard — Wrapper combining AndroidFrame with optional badge / step number
 */
export default function ScreenCard({ screen, index = 0, showStep = true, scale = 1 }) {
  return (
    <div className="screen-card">
      {showStep && (
        <div className="screen-step-badge" aria-hidden="true">
          <span>{String(screen.id).padStart(2, '0')}</span>
        </div>
      )}
      <AndroidFrame
        image={screen.image}
        title={screen.title}
        index={index}
        scale={scale}
      />
      {screen.description && (
        <p className="screen-description">{screen.description}</p>
      )}

      <style>{`
        .screen-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .screen-step-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
        }
        .screen-step-badge span {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .screen-description {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          max-width: 180px;
          margin-top: 0.25rem;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
