import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Asteroid {
  id: string;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: number;
}

interface AsteroidGameContextType {
  asteroids: Asteroid[];
  spawnAsteroids: (count: number) => void;
  removeAsteroid: (id: string) => void;
}

const AsteroidGameContext = createContext<AsteroidGameContextType | undefined>(undefined);

export function AsteroidGameProvider({ children }: { children: ReactNode }) {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

  const spawnAsteroids = useCallback((count: number) => {
    const newAsteroids: Asteroid[] = [];

    for (let i = 0; i < count; i++) {
      // Random spawn location from edges
      const spawnFromTop = Math.random() > 0.5;
      const x = spawnFromTop ? (Math.random() - 0.5) * 30 : (Math.random() > 0.5 ? -15 : 15);
      const y = spawnFromTop ? 12 : (Math.random() - 0.5) * 20;
      const z = -5 - Math.random() * 15;

      // Random velocity (moving diagonally across screen) - much slower
      const velocityX = (Math.random() - 0.5) * 0.05;
      const velocityY = (Math.random() - 0.5) * 0.05;
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
