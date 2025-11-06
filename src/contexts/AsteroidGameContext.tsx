import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Asteroid {
  id: string;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: number;
}

interface ViewportBounds {
  width: number;
  height: number;
}

interface AsteroidGameContextType {
  asteroids: Asteroid[];
  spawnAsteroids: (count: number, bounds?: ViewportBounds) => void;
  removeAsteroid: (id: string) => void;
}

const AsteroidGameContext = createContext<AsteroidGameContextType | undefined>(undefined);

export function AsteroidGameProvider({ children }: { children: ReactNode }) {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

  const spawnAsteroids = useCallback((count: number, bounds?: ViewportBounds) => {
    const newAsteroids: Asteroid[] = [];

    // Use provided bounds or defaults
    const viewportWidth = bounds?.width || 30;
    const viewportHeight = bounds?.height || 25;

    // Add buffer for off-screen spawning
    const spawnBuffer = 5;

    for (let i = 0; i < count; i++) {
      // Spawn from one of four edges (top, bottom, left, right) - off-screen
      const edge = Math.floor(Math.random() * 4);
      let x, y, z;
      let velocityX, velocityY;

      switch (edge) {
        case 0: // Top edge
          x = (Math.random() - 0.5) * viewportWidth * 1.5;
          y = viewportHeight + Math.random() * spawnBuffer; // Start above screen
          z = -15 - Math.random() * 15; // -15 to -30
          velocityX = (Math.random() - 0.5) * 0.04;
          velocityY = -Math.random() * 0.03 - 0.02; // Move downward
          break;
        case 1: // Bottom edge
          x = (Math.random() - 0.5) * viewportWidth * 1.5;
          y = -viewportHeight - Math.random() * spawnBuffer; // Start below screen
          z = -15 - Math.random() * 15;
          velocityX = (Math.random() - 0.5) * 0.04;
          velocityY = Math.random() * 0.03 + 0.02; // Move upward
          break;
        case 2: // Left edge
          x = -viewportWidth - Math.random() * spawnBuffer; // Start left of screen
          y = (Math.random() - 0.5) * viewportHeight * 1.5;
          z = -15 - Math.random() * 15;
          velocityX = Math.random() * 0.03 + 0.02; // Move rightward
          velocityY = (Math.random() - 0.5) * 0.04;
          break;
        case 3: // Right edge
        default:
          x = viewportWidth + Math.random() * spawnBuffer; // Start right of screen
          y = (Math.random() - 0.5) * viewportHeight * 1.5;
          z = -15 - Math.random() * 15;
          velocityX = -Math.random() * 0.03 - 0.02; // Move leftward
          velocityY = (Math.random() - 0.5) * 0.04;
          break;
      }

      const velocityZ = Math.random() * 0.01;

      // Random size (small, medium, large)
      const sizeRoll = Math.random();
      const size = sizeRoll < 0.5 ? 0.5 : sizeRoll < 0.8 ? 0.8 : 1.2;

      newAsteroids.push({
        id: `asteroid-${Date.now()}-${i}`,
        position: { x, y, z },
        velocity: { x: velocityX, y: velocityY, z: velocityZ },
        rotation: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2,
        },
        size,
      });
    }

    setAsteroids((prev) => [...prev, ...newAsteroids]);
  }, []);

  const removeAsteroid = useCallback((id: string) => {
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AsteroidGameContext.Provider
      value={{
        asteroids,
        spawnAsteroids,
        removeAsteroid,
      }}
    >
      {children}
    </AsteroidGameContext.Provider>
  );
}

export function useAsteroidGame() {
  const context = useContext(AsteroidGameContext);
  if (!context) {
    throw new Error('useAsteroidGame must be used within AsteroidGameProvider');
  }
  return context;
}
