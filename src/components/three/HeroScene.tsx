import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Escenario WebGL del Hero — "red de infraestructura" en 3D.
 *
 * Nube de puntos esférica + icosaedro de alambre que rotan suavemente y hacen
 * parallax con el cursor (vía listener global, para no bloquear los clics del
 * hero). Usa los colores del tema (var(--roke-*)) leídos en runtime.
 * Respeta prefers-reduced-motion (queda estático).
 *
 * Se carga con React.lazy desde el Hero, así three.js queda en su propio chunk.
 */

function readCssColor(varName: string, fallback: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return new THREE.Color(v || fallback);
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

const COUNT = 1700;

const Field: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const shell = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const colorText = useMemo(() => readCssColor("--roke-text", "#222222"), []);
  const colorDim = useMemo(() => readCssColor("--roke-text-dimmer", "#7c8493"), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (points.current && !reduced) points.current.rotation.y += d * 0.06;
    if (shell.current && !reduced) {
      shell.current.rotation.y -= d * 0.04;
      shell.current.rotation.x += d * 0.02;
    }
    if (group.current) {
      const tx = mouse.current.y * 0.2;
      const ty = mouse.current.x * 0.32;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          sizeAttenuation
          color={colorDim}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={colorText} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const HeroScene: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Field reduced={reduced} />
    </Canvas>
  );
};

export default HeroScene;
