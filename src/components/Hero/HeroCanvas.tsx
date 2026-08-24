import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// AcousticPulse Spatial Decibel Wave & Cyber Shield Mesh
const AcousticSpatialCore: React.FC<{ mouse: { x: number; y: number } }> = ({ mouse }) => {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const waveRingRef = useRef<THREE.Mesh>(null);
  const outerShieldRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (coreMeshRef.current) {
      // Dynamic decibel wave pulse
      const dbPulse = 1.0 + Math.sin(time * 2.5) * 0.08 + Math.abs(mouse.x) * 0.12;
      coreMeshRef.current.scale.set(dbPulse * 2.2, dbPulse * 2.2, dbPulse * 2.2);

      coreMeshRef.current.rotation.x = THREE.MathUtils.damp(
        coreMeshRef.current.rotation.x,
        time * 0.2 + mouse.y * 0.8,
        3,
        delta
      );
      coreMeshRef.current.rotation.y = THREE.MathUtils.damp(
        coreMeshRef.current.rotation.y,
        time * 0.3 + mouse.x * 0.8,
        3,
        delta
      );
    }

    if (waveRingRef.current) {
      waveRingRef.current.rotation.z = time * 0.4;
      waveRingRef.current.rotation.x = Math.sin(time * 0.5) * 0.3 + mouse.y * 0.4;
      const ringScale = 2.8 + Math.sin(time * 3.0) * 0.15;
      waveRingRef.current.scale.set(ringScale, ringScale, ringScale);
    }

    if (outerShieldRef.current) {
      outerShieldRef.current.rotation.y = -time * 0.15;
      outerShieldRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <group position={[0, 0, 0]}>
        {/* 1. Core Decibel Sphere (AcousticPulse Decibel Propagation) */}
        <mesh ref={coreMeshRef}>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color="#07070c"
            roughness={0.12}
            metalness={0.92}
            emissive="#1f0208"
            emissiveIntensity={0.8}
            wireframe={false}
          />
        </mesh>

        {/* 2. Concentric Acoustic Sound Wave (dB Frequency Ripple) */}
        <mesh ref={waveRingRef}>
          <torusGeometry args={[1.2, 0.03, 16, 100]} />
          <meshBasicMaterial
            color="#ff1e42"
            transparent={true}
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 3. Cybernetic Geodesic Security Lattice (Cisco Cybersecurity Shield) */}
        <mesh ref={outerShieldRef} scale={3.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe={true}
            transparent={true}
            opacity={0.22}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Spatial Decibel Geolocation Particle Swarm (Urban Sensor Nodes)
const SensorParticleField: React.FC<{ mouse: { x: number; y: number } }> = ({ mouse }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1400;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const crimsonColor = new THREE.Color('#ff1e42');
    const cyanColor = new THREE.Color('#00f0ff');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const radius = 3.8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      // Color based on simulated decibel thresholds
      const rand = Math.random();
      const chosenColor = rand > 0.6 ? crimsonColor : rand > 0.25 ? cyanColor : whiteColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.06;
    pointsRef.current.rotation.y = time + mouse.x * 0.15;
    pointsRef.current.rotation.x = mouse.y * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors={true}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export const HeroCanvas: React.FC<{ mouse: { normalizedX: number; normalizedY: number } }> = ({ mouse }) => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.35} />
        {/* Dynamic Decibel Lighting */}
        <pointLight
          position={[mouse.normalizedX * 4, mouse.normalizedY * 4 + 2, 4]}
          intensity={3.0}
          color="#ff1e42"
          distance={16}
        />
        <pointLight
          position={[-5, -4, 2]}
          intensity={1.6}
          color="#00f0ff"
          distance={14}
        />
        <pointLight
          position={[0, 6, -2]}
          intensity={1.2}
          color="#ffffff"
          distance={15}
        />

        <AcousticSpatialCore mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
        <SensorParticleField mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
      </Canvas>
    </div>
  );
};
