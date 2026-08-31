import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * VideoSection — Full-viewport cinematic video player
 * Supports local MP4 and YouTube embed, configured via props from content.json
 */
export default function VideoSection({ videoConfig }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Auto-pause when out of view for performance
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Convert YouTube URL to embed URL
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
      // fallback: try regex
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/))([^?&/]+)/);
      if (match) videoId = match[1];
    }
    if (!videoId) return '';
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=1&playsinline=1&rel=0&modestbranding=1&showinfo=0`;
  };

  const isYouTube = videoConfig?.type === 'youtube' && videoConfig?.youtubeUrl;

  return (
    <motion.section
      ref={containerRef}
      className="video-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      aria-label="Kalpataru showcase video"
    >
      <div className="video-container">
        {isYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(videoConfig.youtubeUrl)}
            title="Kalpataru Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="video-iframe"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            className="video-element"
            autoPlay
            loop
            controls
            playsInline
            preload="metadata"
            poster=""
          >
            <source src={videoConfig?.localPath || '/assets/video/kalpataru.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Top/bottom gradient fade for cinematic feel */}
        <div className="video-gradient-top" />
        <div className="video-gradient-bottom" />
      </div>

      <style>{`
        .video-section {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0a0a08;
          margin-left: calc(-50vw + 50%);
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to bottom, rgba(250, 247, 242, 0.6), transparent);
          pointer-events: none;
          z-index: 2;
        }

        .video-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(250, 247, 242, 0.6), transparent);
          pointer-events: none;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .video-section {
            height: 60vh;
          }
        }
      `}</style>
    </motion.section>
  );
}
