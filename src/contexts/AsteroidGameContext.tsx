import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Asteroid {
  id: string;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: number;
  points: number;
}

interface AsteroidGameContextType {
  score: number;
  asteroids: Asteroid[];
  spawnAsteroids: (count: number) => void;
  destroyAsteroid: (id: string) => void;
  removeAsteroid: (id: string) => void;
}

const AsteroidGameContext = createContext<AsteroidGameContextType | undefined>(undefined);

export function AsteroidGameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

  const spawnAsteroids = useCallback((count: number) => {
    const newAsteroids: Asteroid[] = [];

    for (let i = 0; i < count; i++) {
      // Random spawn location from edges
      const spawnFromTop = Math.random() > 0.5;
      const x = spawnFromTop ? (Math.random() - 0.5) * 30 : (Math.random() > 0.5 ? -15 : 15);
      const y = spawnFromTop ? 12 : (Math.random() - 0.5) * 20;
      const z = -5 - Math.random() * 15;

      // Random velocity (moving diagonally across screen)
      const velocityX = (Math.random() - 0.5) * 0.2;
      const velocityY = (Math.random() - 0.5) * 0.2;
      const velocityZ = Math.random() * 0.05;

      // Random size (small, medium, large)
      const sizeRoll = Math.random();
      let size: number;
      let points: number;

      if (sizeRoll < 0.5) {
        size = 0.5; // Small
        points = 10;
      } else if (sizeRoll < 0.8) {
        size = 0.8; // Medium
        points = 20;
      } else {
        size = 1.2; // Large
        points = 30;
      }

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
        points,
      });
    }

    setAsteroids((prev) => [...prev, ...newAsteroids]);
  }, []);

  const destroyAsteroid = useCallback((id: string) => {
    const asteroid = asteroids.find((a) => a.id === id);
    if (asteroid) {
      setScore((prev) => prev + asteroid.points);
    }
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  }, [asteroids]);

  const removeAsteroid = useCallback((id: string) => {
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AsteroidGameContext.Provider
      value={{
        score,
        asteroids,
        spawnAsteroids,
        destroyAsteroid,
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
