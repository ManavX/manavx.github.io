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

  const scrollToSection = (section: 'skills' | 'projects' | 'experience') => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      <ScrollProgress />
      <CustomCursor />
      <FrameByFrameGif scrollProgress={scrollProgress} />
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
  );
}

export default App;
