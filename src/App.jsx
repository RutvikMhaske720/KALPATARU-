import content from './data/content.json';

// Components
import FloatingNav from './components/FloatingNav';
import CulturalMotifs from './components/CulturalMotifs';
import VideoSection from './components/VideoSection';

// Sections
import Hero from './sections/Hero';
import AppJourney from './sections/AppJourney';
import GovernmentSchemes from './sections/GovernmentSchemes';
import OfflineExhibition from './sections/OfflineExhibition';
import FinalShowcase from './sections/FinalShowcase';
import Footer from './sections/Footer';

/**
 * App — Kalpataru Interactive Showcase
 * Orchestrates all sections into a cohesive immersive story
 */
export default function App() {
  return (
    <div className="app" id="app">
      {/* Grain overlay for textured premium feel */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Subtle cultural background motifs */}
      <CulturalMotifs />

      {/* Minimal floating navigation */}
      <FloatingNav items={content.navigation} />

      {/* 1. Hero / Opening Experience */}
      <Hero brand={content.brand} />

      {/* 2. Cinematic Video Section */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <VideoSection videoConfig={content.video} />
      </div>

      {/* 3. App Journey — 10 screens with flow connectors */}
      <AppJourney
        screens={content.appScreens}
        journey={content.journey}
      />

      {/* 4. Government Schemes — Screen 11 */}
      <GovernmentSchemes data={content.governmentScheme} />

      {/* 5. Offline Exhibition — Screen 12 */}
      <OfflineExhibition data={content.offlineExhibition} />

      {/* 6. Final Showcase — Screen 13 */}
      <FinalShowcase data={content.finalScreen} />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
