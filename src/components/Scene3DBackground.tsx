import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { useAsteroidGame } from '../contexts/AsteroidGameContext';
import { createNoise3D } from 'simplex-noise';

function StarParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  const particles = useMemo(() => {
    const positions = new Float32Array(75 * 3);
    const colors = new Float32Array(75 * 3);

    for (let i = 0; i < 75; i++) {
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
      <planeGeometry args={[100, 100, 30, 30]} />
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
  removalBounds: { width: number; height: number };
}

function Asteroid({ position, velocity, rotation, size, onRemove, removalBounds }: AsteroidProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef({ x: position.x, y: position.y, z: position.z });

  // Random color palette selection
  const asteroidColor = useMemo(() => {
    const palettes = [
      // Gray asteroid
      { base: '#6B6B6B', dark: '#3A3A3A', light: '#8C8C8C' },
      // Brown asteroid
      { base: '#8B7355', dark: '#5C4A38', light: '#A68968' },
      // Dark gray/charcoal
      { base: '#4A4A4A', dark: '#2A2A2A', light: '#6A6A6A' },
      // Reddish brown
      { base: '#7A5548', dark: '#5A3A30', light: '#9A6B5C' },
      // Pale gray
      { base: '#9B9B9B', dark: '#6B6B6B', light: '#BBBBBB' },
      // Dark brown
      { base: '#654321', dark: '#3D2813', light: '#8B6239' },
      // Blue-gray
      { base: '#6B7B8C', dark: '#4A5A6B', light: '#8C9CAD' },
    ];

    return palettes[Math.floor(Math.random() * palettes.length)];
  }, []);

  // Create randomized asteroid geometry with noise
  const geometry = useMemo(() => {
    // Use higher detail for better looking asteroids
    const geo = new THREE.IcosahedronGeometry(size, 1);
    const positions = geo.attributes.position.array;

    // Create noise generator with random seed for each asteroid
    const noise3D = createNoise3D();
    const seed = Math.random() * 1000;

    // Parameters for noise-based deformation
    const noiseScale = 2.5; // How "zoomed in" the noise is
    const noiseStrength = size * 0.4; // How much displacement
    const craterScale = 1.5; // Scale for crater-like features
    const craterStrength = size * 0.2; // Strength of crater depressions

    // Apply multi-layered noise to each vertex
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Normalize to get direction
      const length = Math.sqrt(x * x + y * y + z * z);
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      // Base noise for overall shape deformation
      const noise1 = noise3D(
        nx * noiseScale + seed,
        ny * noiseScale + seed,
        nz * noiseScale + seed
      );

      // Higher frequency noise for surface detail
      const noise2 = noise3D(
        nx * noiseScale * 3 + seed + 100,
        ny * noiseScale * 3 + seed + 100,
        nz * noiseScale * 3 + seed + 100
      );

      // Crater-like depressions (using abs for sharp features)
      const craterNoise = Math.abs(noise3D(
        nx * craterScale + seed + 200,
        ny * craterScale + seed + 200,
        nz * craterScale + seed + 200
      ));

      // Combine noise layers
      const displacement =
        noise1 * noiseStrength +
        noise2 * noiseStrength * 0.3 -
        craterNoise * craterStrength;

      // Apply displacement along vertex normal
      positions[i] = x + nx * displacement;
      positions[i + 1] = y + ny * displacement;
      positions[i + 2] = z + nz * displacement;
    }

    // Add vertex colors for surface variation
    const colors = new Float32Array((positions.length / 3) * 3);
    const noise3DColor = createNoise3D();
    const colorSeed = Math.random() * 1000;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Use noise to vary between dark, base, and light colors
      const colorNoise = noise3DColor(
        x * 2 + colorSeed,
        y * 2 + colorSeed,
        z * 2 + colorSeed
      );

      // Map noise (-1 to 1) to color variation (0.7 to 1.3)
      const colorMultiplier = 0.85 + colorNoise * 0.15;

      // Set RGB values (will be multiplied with material color)
      const vertexIndex = i;
      colors[vertexIndex] = colorMultiplier;
      colors[vertexIndex + 1] = colorMultiplier;
      colors[vertexIndex + 2] = colorMultiplier;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
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

      // Remove if off-screen (expanded bounds to allow off-screen spawning)
      const removalBuffer = 10;
      if (
        currentPos.current.x < -removalBounds.width - removalBuffer ||
        currentPos.current.x > removalBounds.width + removalBuffer ||
        currentPos.current.y < -removalBounds.height - removalBuffer ||
        currentPos.current.y > removalBounds.height + removalBuffer ||
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
        color={asteroidColor.base}
        roughness={0.95}
        metalness={0.05}
        vertexColors
      />
    </mesh>
  );
}

function AsteroidsLayer() {
  const { asteroids, removeAsteroid, spawnAsteroids } = useAsteroidGame();
  const asteroidsRef = useRef(asteroids);
  const { camera, size } = useThree();
  const hasSpawnedInitial = useRef(false);

  // Calculate viewport bounds and store in ref to avoid triggering effects
  const viewportBoundsRef = useRef({ width: 30, height: 25 });

  useEffect(() => {
    // Get the camera's FOV and aspect ratio
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const fov = perspectiveCamera.fov * (Math.PI / 180); // Convert to radians

    // Calculate visible height and width at the average z-depth of asteroids
    const avgZ = 20; // Average z distance (camera at 15, asteroids from -15 to -30)
    const visibleHeight = 2 * Math.tan(fov / 2) * avgZ;
    const visibleWidth = visibleHeight * (size.width / size.height);

    viewportBoundsRef.current = {
      width: visibleWidth / 2,
      height: visibleHeight / 2,
    };
  }, [camera, size]);

  // Keep ref updated
  useEffect(() => {
    asteroidsRef.current = asteroids;
  }, [asteroids]);

  // Spawn initial asteroids on mount only
  useEffect(() => {
    if (!hasSpawnedInitial.current) {
      hasSpawnedInitial.current = true;
      spawnAsteroids(8, viewportBoundsRef.current);
    }
  }, [spawnAsteroids]);

  // Set up periodic spawning with max limit to prevent buildup when tab is inactive
  useEffect(() => {
    const interval = setInterval(() => {
      // Only spawn if we have fewer than 20 asteroids to prevent buildup
      if (asteroidsRef.current.length < 20) {
        spawnAsteroids(4, viewportBoundsRef.current);
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
          removalBounds={viewportBoundsRef.current}
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
        dpr={[1, 1.5]} // Device pixel ratio for high quality
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
        <StarParticles />
        <GridBackground />
        <Sparkles count={30} scale={15} size={2} speed={0.3} color="#667eea" />
        <AsteroidsLayer />

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
