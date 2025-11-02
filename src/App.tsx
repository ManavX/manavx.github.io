import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Scene3DBackground } from './components/Scene3DBackground';
import { Hero } from './components/Hero';
import { HorizontalProjects } from './components/HorizontalProjects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ChessPieceNav } from './components/ChessPieceNav';
import { AsteroidGameProvider } from './contexts/AsteroidGameContext';
import './App.css';

function App() {
  useSmoothScroll();

  const scrollToSection = (section: 'skills' | 'projects' | 'experience') => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AsteroidGameProvider>
      <div className="app">
        <ScrollProgress />
        <CustomCursor />
        <Scene3DBackground />
        <ChessPieceNav onScrollTo={scrollToSection} />
        <Hero />

        <div id="projects">
          <HorizontalProjects />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="experience">
          <Experience />
        </div>
      </div>
    </AsteroidGameProvider>
  );
}

export default App;
