import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Center, Float, Sparkles } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();

  useFrame(() => {
    if (textRef.current) {
      const scrollValue = scrollYProgress.get();
      // Fade away as user scrolls
      if (textRef.current.material instanceof THREE.Material) {
        textRef.current.material.opacity = Math.max(0, 1 - scrollValue * 1.2);
      }
      textRef.current.position.z = scrollValue * 3 - 1;
    }
  });

  return (
    <Center>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          ref={textRef}
          fontSize={2.5}
          maxWidth={20}
          lineHeight={1}
          letterSpacing={0.08}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.15}
          outlineColor="#764ba2"
          outlineBlur={0.3}
          outlineOpacity={0.5}
        >
          MANAV ACHARYA
          <meshStandardMaterial
            color="#667eea"
            emissive="#764ba2"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={1}
          />
        </Text>
      </Float>
    </Center>
  );
}

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
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
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

interface ChessPieceProps {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  initialPosition: [number, number, number];
  color: string;
}

function ChessPieceGeometry({ type }: { type: string }) {
  switch (type) {
    case 'king':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.4, 16]} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
          </mesh>
          <mesh position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
          </mesh>
        </>
      );
    case 'queen':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.4, 16]} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.4, 0.6, 16]} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
          </mesh>
        </>
      );
    case 'rook':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 8]} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.6, 8]} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.45, 0.4, 0.3, 8]} />
          </mesh>
        </>
      );
    case 'bishop':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.4, 16]} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.35, 0.7, 16]} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
          </mesh>
        </>
      );
    case 'knight':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.6, 0.4]} />
          </mesh>
          <mesh position={[0.1, 0.8, 0.2]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.3, 0.5, 0.3]} />
          </mesh>
        </>
      );
    case 'pawn':
      return (
        <>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.2, 16]} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.25, 0.3, 0.3, 16]} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
          </mesh>
        </>
      );
    default:
      return <sphereGeometry args={[0.3, 16, 16]} />;
  }
}

function ChessPiece({ type, initialPosition, color }: ChessPieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(...initialPosition));
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, viewport } = useThree();

  useFrame(() => {
    if (groupRef.current && !isDragging) {
      groupRef.current.position.lerp(position, 0.1);
    } else if (groupRef.current && isDragging) {
      groupRef.current.position.copy(position);
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'none';
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) {
      e.stopPropagation();

      const x = (e.pointer.x * viewport.width) / 2;
      const y = (e.pointer.y * viewport.height) / 2;

      setPosition(new THREE.Vector3(x, y, position.z));
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4} enabled={!isDragging}>
      <group
        ref={groupRef}
        position={initialPosition}
        scale={hovered || isDragging ? 1.2 : 1}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'grab';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'none';
        }}
      >
        <ChessPieceGeometry type={type} />
        <meshStandardMaterial
          color={color}
          emissive={hovered || isDragging ? color : '#000000'}
          emissiveIntensity={hovered || isDragging ? 0.6 : 0}
          roughness={0.3}
          metalness={0.8}
        />
      </group>
    </Float>
  );
}

function FloatingChessPieces() {
  const chessPieces = useMemo(() => [
    { type: 'king' as const, color: '#FFD700', position: [8, 4, -5] as [number, number, number] },
    { type: 'queen' as const, color: '#C0C0C0', position: [-8, -3, -3] as [number, number, number] },
    { type: 'rook' as const, color: '#667eea', position: [6, -4, -8] as [number, number, number] },
    { type: 'bishop' as const, color: '#764ba2', position: [-6, 5, -6] as [number, number, number] },
    { type: 'knight' as const, color: '#FF6B6B', position: [4, 2, -10] as [number, number, number] },
    { type: 'pawn' as const, color: '#4ECDC4', position: [-4, -2, -4] as [number, number, number] },
  ], []);

  return (
    <>
      {chessPieces.map((piece, index) => (
        <ChessPiece
          key={index}
          type={piece.type}
          initialPosition={piece.position}
          color={piece.color}
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

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
