import { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { FrameByFrameGif } from './components/FrameByFrameGif';
import { Hero } from './components/Hero';
import { HorizontalProjects } from './components/HorizontalProjects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ChessPieceNav } from './components/ChessPieceNav';
import './App.css';

function App() {
  const scrollProgress = useSmoothScroll();
  const [visibleSections, setVisibleSections] = useState({
    skills: false,
    projects: false,
    experience: false,
  });

  const toggleSection = (section: 'skills' | 'projects' | 'experience') => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="app">
      <ScrollProgress />
      <CustomCursor />
      <FrameByFrameGif scrollProgress={scrollProgress} />
      <ChessPieceNav
        onToggle={toggleSection}
        visibleSections={visibleSections}
      />
      <Hero />

      {/* Spacer to enable scrolling */}
      <div className="content-spacer" />

      {visibleSections.projects && <HorizontalProjects />}
      {visibleSections.skills && <Skills />}
      {visibleSections.experience && <Experience />}
    </div>
  );
}

export default App;
