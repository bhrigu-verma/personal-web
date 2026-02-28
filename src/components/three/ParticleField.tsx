"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Floating particles in the hero background */
export function ParticleField({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Floating orb that follows a gentle orbit */
export function FloatingOrb({ color = "#a855f7", radius = 0.3, speed = 0.5, orbit = 3 }: {
  color?: string;
  radius?: number;
  speed?: number;
  orbit?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.position.x = Math.cos(t) * orbit;
    mesh.current.position.y = Math.sin(t * 0.7) * 1.5;
    mesh.current.position.z = Math.sin(t) * orbit * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

/** Glowing ring geometry */
export function GlowRing({ radius = 2, color = "#06b6d4" }: { radius?: number; color?: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + 0.5;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}
