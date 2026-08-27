import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { SkillsEcosystem } from './components/Skills/SkillsEcosystem';
import { IndustrialVisit } from './components/Experience/IndustrialVisit';
import { Photography } from './components/Photography/Photography';
import { Achievements } from './components/Achievements/Achievements';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { SoundProvider } from './context/SoundContext';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <SoundProvider>
      <div className="relative min-h-screen bg-canvas text-neutral-100 selection:bg-crimson selection:text-white">
        {/* Cinematic Opening Preloader */}
        <Preloader onComplete={() => setIsLoaded(true)} />

        {/* Global Hardware Accelerated Film Grain & Ambient Vignette */}
        <NoiseOverlay />

        {/* Adaptive Spring-Interpolated Cursor */}
        <CustomCursor />

        {/* Floating Glass Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className={`relative transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Hero />
          <About />
          <ProjectsSection />
          <SkillsEcosystem />
          <IndustrialVisit />
          <Photography />
          <Achievements />
          <Contact />
        </main>

        {/* Studio Footer */}
        <Footer />
      </div>
    </SoundProvider>
  );
};

export default App;
