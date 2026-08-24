import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Sliders, RefreshCw, Layers, Eye } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

// Custom Animated Distortion Shader Mesh
const MorphingTorusKnot: React.FC<{
  speed: number;
  wireframe: boolean;
  colorScheme: 'crimson' | 'cyan' | 'gold' | 'neon';
  distortion: number;
}> = ({ speed, wireframe, colorScheme, distortion }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const colors = useMemo(() => {
    switch (colorScheme) {
      case 'cyan':
        return { base: '#051824', emissive: '#00f0ff', wire: '#00f0ff' };
      case 'gold':
        return { base: '#1f1505', emissive: '#ffb703', wire: '#ffb703' };
      case 'neon':
        return { base: '#180518', emissive: '#ff007f', wire: '#ff007f' };
      case 'crimson':
      default:
        return { base: '#150308', emissive: '#ff1e42', wire: '#ff2d55' };
    }
  }, [colorScheme]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed;

    meshRef.current.rotation.x = time * 0.4;
    meshRef.current.rotation.y = time * 0.6;
    meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.3;

    // Subtle scale breathing
    const scale = 1.3 + Math.sin(time * 0.8) * 0.1 * distortion;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.42, 160, 32, 2, 3]} />
        <meshStandardMaterial
          color={colors.base}
          emissive={colors.emissive}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
};

// Quantum Orbit Particle Ring
const QuantumRing: React.FC<{ colorScheme: string }> = ({ colorScheme }) => {
  const ringRef = useRef<THREE.Points>(null);
  const count = 1600;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + (Math.random() - 0.5) * 1.8;
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime() * 0.15;
    ringRef.current.rotation.y = time;
    ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
  });

  const particleColor = colorScheme === 'cyan' ? '#00f0ff' : colorScheme === 'gold' ? '#ffb703' : '#ff2d55';

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={particleColor}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const WebGLLab: React.FC = () => {
  const [wireframe, setWireframe] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [colorScheme, setColorScheme] = useState<'crimson' | 'cyan' | 'gold' | 'neon'>('crimson');
  const [distortion, setDistortion] = useState(1);
  const { playHoverSound, playClickSound, playSwitchSound } = useSound();

  return (
    <section
      id="lab"
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <span className="text-crimson font-bold">04 //</span>
              <span className="uppercase tracking-widest text-neutral-200">INTERACTIVE SHADER LAB</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Experimental 3D Playground
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-neutral-400">
            Real-time WebGL geometry and dynamic shader simulation. Click and drag within the viewport to rotate the 3D scene.
          </p>
        </div>

        {/* 3D Canvas Viewport + Interactive Controller HUD */}
        <div className="relative h-[620px] w-full rounded-3xl bg-surface-elevated/80 border border-white/15 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          {/* Three.js R3F Canvas */}
          <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" data-cursor="drag">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={2.5} color="#ff1e42" />
              <pointLight position={[-5, -5, -2]} intensity={1.8} color="#00f0ff" />
              <pointLight position={[0, 4, -4]} intensity={1.2} color="#ffffff" />

              <MorphingTorusKnot
                speed={speed}
                wireframe={wireframe}
                colorScheme={colorScheme}
                distortion={distortion}
              />
              <QuantumRing colorScheme={colorScheme} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                rotateSpeed={0.8}
              />
            </Canvas>
          </div>

          {/* Top Left Telemetry HUD */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none hidden sm:block">
            <div className="flex flex-col gap-1 font-mono text-[11px] text-neutral-400 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <span className="text-crimson font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-ping" />
                // GLSL SHADER PIPELINE
              </span>
              <span>VERTICES: 12,800 · FACES: 25,600</span>
              <span>RENDER TARGET: 60 FPS WEBGL 2.0</span>
            </div>
          </div>

          {/* Bottom Interactive HUD Controls Deck */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-center justify-between gap-4 bg-canvas/85 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/15">
            {/* Color Palette Selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-400 uppercase mr-2 hidden md:inline">
                AURA:
              </span>
              {(['crimson', 'cyan', 'gold', 'neon'] as const).map((scheme) => (
                <button
                  key={scheme}
                  onClick={() => {
                    playSwitchSound();
                    setColorScheme(scheme);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                    colorScheme === scheme
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {scheme}
                </button>
              ))}
            </div>

            {/* Geometry & Motion Toggles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playClickSound();
                  setWireframe(!wireframe);
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  wireframe
                    ? 'bg-crimson text-white shadow-[0_0_15px_rgba(255,30,66,0.4)] border border-crimson'
                    : 'bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>WIREFRAME</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1));
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white/[0.04] text-neutral-300 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                <span>VELOCITY: {speed}X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
