import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

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

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
