import { useState } from 'react';
import content from './data/content.json';

// Components
import FloatingNav from './components/FloatingNav';
import CulturalMotifs from './components/CulturalMotifs';
import FileViewerModal from './components/FileViewerModal';

// Sections
import Hero from './sections/Hero';
import AppJourney from './sections/AppJourney';
import GovernmentSchemes from './sections/GovernmentSchemes';
import OfflineExhibition from './sections/OfflineExhibition';
import FinalShowcase from './sections/FinalShowcase';
import ProjectFilesSection from './sections/ProjectFilesSection';
import Footer from './sections/Footer';

/**
 * App — Kalpataru Interactive Showcase
 * Orchestrates all sections into a cohesive immersive story
 */
export default function App() {
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [fileModalTab, setFileModalTab] = useState('cpp');

  const openFileModal = (tab = 'cpp') => {
    setFileModalTab(tab);
    setFileModalOpen(true);
  };

  return (
    <div className="app" id="app">
      {/* Grain overlay for textured premium feel */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Subtle cultural background motifs */}
      <CulturalMotifs />

      {/* Minimal floating navigation */}
      <FloatingNav items={content.navigation} />

      {/* 1. Hero / Opening Experience */}
      <Hero brand={content.brand} onOpenFileModal={openFileModal} />

      {/* 2. App Journey — 10 screens with flow connectors */}
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

      {/* 7. Project Documentation & Source Files (main.cpp & MTP.pdf) */}
      <ProjectFilesSection onOpenFileModal={openFileModal} />

      {/* 8. Footer */}
      <Footer />

      {/* Modal File Viewer (Inspect main.cpp & MTP.pdf in window + Copy Code option) */}
      <FileViewerModal
        isOpen={fileModalOpen}
        onClose={() => setFileModalOpen(false)}
        initialTab={fileModalTab}
      />
    </div>
  );
}
