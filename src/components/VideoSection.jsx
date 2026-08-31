import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AndroidFrame from './AndroidFrame';
import InfiniteSpiral from './InfiniteSpiral';

/**
 * VideoSection — Two-column layout with Infinite Spiral on left and video on right.
 */
export default function VideoSection({ videoConfig }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname.includes('/live/')) {
        videoId = urlObj.pathname.split('/live/')[1];
      } else {
        videoId = urlObj.searchParams.get('v');
      }
    } catch (e) {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/))([^?&/]+)/);
      if (match) videoId = match[1];
    }
    if (!videoId) return '';
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1&playsinline=1&rel=0&modestbranding=1&showinfo=0`;
  };

  const isYouTube = videoConfig?.type === 'youtube' && videoConfig?.youtubeUrl;

  // 13 screens for the infinite spiral
  const spiralItems = Array.from({ length: 13 }, (_, i) => ({
    src: `/assets/images/${i + 1}.jpeg`,
    alt: `Kalpataru App Screen ${i + 1}`
  }));

  return (
    <motion.section
      ref={containerRef}
      className="video-section section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      aria-label="Kalpataru App Showcase"
    >
      <div className="showcase-container">
        
        {/* Left Column: Infinite Spiral */}
        <div className="showcase-col-left">
          <div className="spiral-wrapper">
            <InfiniteSpiral
              items={spiralItems}
              animationMode="all"
              speed={0.55}
              radius={180}
              cardWidth={140}
              cardHeight={280}
              verticalSpacing={80}
              perspective={1000}
              cardRadius={12}
              centerScale={1.3}
              edgeBlur={4}
              cardsPerTurn={8}
              pauseOnHover={true}
              imageFit="cover"
            />
          </div>
        </div>

        {/* Right Column: Mobile Video Frame */}
        <div className="showcase-col-right">
          <div className="video-frame-wrapper">
            {isYouTube ? (
              <div className="youtube-wrapper">
                <iframe
                  src={getYouTubeEmbedUrl(videoConfig.youtubeUrl)}
                  title="Kalpataru Video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                  loading="lazy"
                />
              </div>
            ) : (
              <AndroidFrame scale={1.3} title="Live App Demo">
                <video
                  ref={videoRef}
                  className="video-element-mobile"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src={videoConfig?.localPath || '/assets/video/kalpataru.mp4'} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </AndroidFrame>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .video-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #0a0a08;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .showcase-container {
          display: flex;
          width: 100%;
          max-width: var(--max-width);
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
        }

        .showcase-col-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80vh;
          min-height: 600px;
          position: relative;
        }

        .spiral-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .showcase-col-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 5;
        }

        .video-frame-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .youtube-wrapper {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16/9;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .video-iframe {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 900px) {
          .showcase-container {
            flex-direction: column-reverse;
            gap: 2rem;
          }
          .showcase-col-left {
            height: 60vh;
            min-height: 400px;
            width: 100%;
          }
        }
      `}</style>
    </motion.section>
  );
}
