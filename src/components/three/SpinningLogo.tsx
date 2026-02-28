"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** A spinning GitHub Octocat-style placeholder for loading */
export function SpinningLogo() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 1.5;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Octahedron as stylized logo */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}
