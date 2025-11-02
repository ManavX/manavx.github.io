import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { useAsteroidGame } from '../contexts/AsteroidGameContext';

function ChessParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    const colors = new Float32Array(100 * 3);

    for (let i = 0; i < 100; i++) {
      // Position particles in a cube around the scene
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Color gradient from purple to blue
      const colorIndex = Math.random();
      colors[i * 3] = 0.4 + colorIndex * 0.2; // R
      colors[i * 3 + 1] = 0.5 + colorIndex * 0.3; // G
      colors[i * 3 + 2] = 0.8 + colorIndex * 0.2; // B
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const scrollValue = scrollYProgress.get();
      particlesRef.current.rotation.y = scrollValue * Math.PI * 0.5;
      particlesRef.current.rotation.x = scrollValue * Math.PI * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GridBackground() {
  const gridRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();

  useFrame(() => {
    if (gridRef.current) {
      const scrollValue = scrollYProgress.get();
      gridRef.current.position.z = scrollValue * 20 - 10;
      gridRef.current.rotation.x = -Math.PI / 4 + scrollValue * Math.PI * 0.2;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial
        color="#0a0a0a"
        wireframe
        emissive="#667eea"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function CameraController() {
  const { scrollYProgress } = useScroll();

  useFrame(({ camera }) => {
    const scrollValue = scrollYProgress.get();
    camera.position.z = 15 - scrollValue * 10;
    camera.position.y = scrollValue * 5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface AsteroidProps {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: number;
  onRemove: () => void;
}

function Asteroid({ position, velocity, rotation, size, onRemove }: AsteroidProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef({ x: position.x, y: position.y, z: position.z });

  // Create randomized asteroid geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(size, 1);
    const positions = geo.attributes.position.array;

    // Randomize vertices for irregular shape
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * size * 0.3;
      positions[i + 1] += (Math.random() - 0.5) * size * 0.3;
      positions[i + 2] += (Math.random() - 0.5) * size * 0.3;
    }

    geo.computeVertexNormals();
    return geo;
  }, [size]);

  useFrame(() => {
    if (meshRef.current) {
      // Update position
      currentPos.current.x += velocity.x;
      currentPos.current.y += velocity.y;
      currentPos.current.z += velocity.z;

      meshRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);

      // Rotate asteroid
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;

      // Remove if off-screen (expanded bounds so they stay visible longer)
      if (
        currentPos.current.x < -30 ||
        currentPos.current.x > 30 ||
        currentPos.current.y < -25 ||
        currentPos.current.y > 25 ||
        currentPos.current.z > 30
      ) {
        onRemove();
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <meshStandardMaterial
        color="#8B7355"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

function AsteroidsLayer() {
  const { asteroids, removeAsteroid, spawnAsteroids } = useAsteroidGame();
  const asteroidsRef = useRef(asteroids);

  // Keep ref updated
  useEffect(() => {
    asteroidsRef.current = asteroids;
  }, [asteroids]);

  // Spawn initial asteroids on mount only
  useEffect(() => {
    spawnAsteroids(8);
  }, [spawnAsteroids]);

  // Set up periodic spawning with max limit to prevent buildup when tab is inactive
  useEffect(() => {
    const interval = setInterval(() => {
      // Only spawn if we have fewer than 20 asteroids to prevent buildup
      if (asteroidsRef.current.length < 20) {
        spawnAsteroids(4);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [spawnAsteroids]);

  return (
    <>
      {asteroids.map((asteroid) => (
        <Asteroid
          key={asteroid.id}
          position={asteroid.position}
          velocity={asteroid.velocity}
          rotation={asteroid.rotation}
          size={asteroid.size}
          onRemove={() => removeAsteroid(asteroid.id)}
        />
      ))}
    </>
  );
}

export function Scene3DBackground() {
  return (
    <div className="scene-3d-background">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]} // Device pixel ratio for high quality
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#0a0a0a']} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#667eea" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#764ba2" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#FF6B6B"
        />

        {/* Scene elements */}
        <ChessParticles />
        <GridBackground />
        <Sparkles count={50} scale={15} size={2} speed={0.3} color="#667eea" />
        <AsteroidsLayer />

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
