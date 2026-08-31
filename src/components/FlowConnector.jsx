import { useRef, useEffect, useState } from 'react';

/**
 * FlowConnector — Animated SVG connector between app screens
 * Supports horizontal arrows and vertical connectors between rows
 * type: 'horizontal' | 'vertical'
 */
export default function FlowConnector({ type = 'horizontal', className = '' }) {
  const pathRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (type === 'vertical') {
    return (
      <div ref={containerRef} className={`flow-connector flow-vertical ${className}`}>
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            ref={pathRef}
            d="M20 0 L20 45"
            stroke="url(#vertGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={isVisible ? '0' : '60'}
            strokeDashoffset={isVisible ? '0' : '60'}
            className="flow-path"
          />
          {/* Arrow head */}
          <path d="M14 40 L20 50 L26 40" stroke="url(#vertGrad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={isVisible ? 1 : 0} className="flow-arrow" />
          {/* Flowing particle */}
          {isVisible && (
            <circle r="3" fill="#D4AF37" opacity="0.8" className="flow-particle-v">
              <animateMotion dur="2s" repeatCount="indefinite" path="M20 0 L20 50" />
            </circle>
          )}
          <defs>
            <linearGradient id="vertGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2D5A3F" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        <style>{`
          .flow-vertical {
            display: flex;
            justify-content: center;
            padding: 0.5rem 0;
          }
          .flow-vertical .flow-path {
            transition: stroke-dasharray 1s ease, stroke-dashoffset 1s ease;
          }
          .flow-vertical .flow-arrow {
            transition: opacity 0.5s ease 0.8s;
          }
        `}</style>
      </div>
    );
  }

  // Horizontal connector
  return (
    <div ref={containerRef} className={`flow-connector flow-horizontal ${className}`}>
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="horzGrad" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2D5A3F" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main line */}
        <path
          d="M5 20 Q20 20 40 20 Q60 20 70 20"
          stroke="url(#horzGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={isVisible ? '0' : '80'}
          strokeDashoffset={isVisible ? '0' : '80'}
          className="flow-path"
        />

        {/* Arrow head */}
        <path d="M65 14 L75 20 L65 26" stroke="url(#horzGrad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={isVisible ? 1 : 0} className="flow-arrow" />

        {/* Flowing particle */}
        {isVisible && (
          <circle r="3" fill="#D4AF37" opacity="0.7" filter="url(#glowFilter)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M5 20 Q20 20 40 20 Q60 20 75 20" />
          </circle>
        )}
      </svg>

      <style>{`
        .flow-horizontal {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .flow-horizontal .flow-path {
          transition: stroke-dasharray 1.2s ease, stroke-dashoffset 1.2s ease;
        }
        .flow-horizontal .flow-arrow {
          transition: opacity 0.5s ease 1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-particle-v,
          .flow-connector circle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
