import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── types ─────────────────────────────────────────────────────────── */
export interface ServerSceneProps {
  /** 0 → 1: how far through the scroll story we are */
  progress: number;
}

/* ─── helpers ────────────────────────────────────────────────────────── */
function readCssVar(v: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}
/** map progress in [from,to] → 0..1 */
function segment(progress: number, from: number, to: number) {
  return clamp01((progress - from) / (to - from));
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}

/* ─── part descriptors ───────────────────────────────────────────────── */
interface Part {
  id: string;
  /** world-space rest position */
  rest: [number, number, number];
  /** fly-in start offset (displaced) */
  from: [number, number, number];
  /** scroll range [0-1] in which this part appears */
  range: [number, number];
  color: string;
  geo: "box" | "slim-box" | "disk" | "long-bar";
  geoArgs: number[];
}

const PARTS: Part[] = [
  // Chassis / frame  → appears first
  {
    id: "chassis",
    rest: [0, 0, 0],
    from: [0, -3, 0],
    range: [0, 0.12],
    color: "#1e2330",
    geo: "box",
    geoArgs: [3.8, 0.38, 1.6],
  },
  // Motherboard
  {
    id: "mobo",
    rest: [0, 0.22, 0],
    from: [0, 3, -1],
    range: [0.1, 0.2],
    color: "#1a2a1a",
    geo: "box",
    geoArgs: [3.4, 0.06, 1.3],
  },
  // CPU (center)
  {
    id: "cpu",
    rest: [-0.4, 0.3, 0.1],
    from: [-3, 2, 2],
    range: [0.18, 0.3],
    color: "#b0b8c8",
    geo: "box",
    geoArgs: [0.54, 0.12, 0.54],
  },
  // CPU cooler
  {
    id: "cooler",
    rest: [-0.4, 0.46, 0.1],
    from: [-3, 3, 0],
    range: [0.24, 0.34],
    color: "#556070",
    geo: "disk",
    geoArgs: [0.32, 0.1, 16],
  },
  // RAM stick 1
  {
    id: "ram0",
    rest: [0.3, 0.34, -0.38],
    from: [3, 2, -2],
    range: [0.3, 0.42],
    color: "#2a7de1",
    geo: "slim-box",
    geoArgs: [0.1, 0.28, 0.9],
  },
  // RAM stick 2
  {
    id: "ram1",
    rest: [0.52, 0.34, -0.38],
    from: [3, 2.5, -2],
    range: [0.34, 0.44],
    color: "#2a7de1",
    geo: "slim-box",
    geoArgs: [0.1, 0.28, 0.9],
  },
  // RAM stick 3
  {
    id: "ram2",
    rest: [0.74, 0.34, -0.38],
    from: [3, 3, -2],
    range: [0.38, 0.46],
    color: "#2a7de1",
    geo: "slim-box",
    geoArgs: [0.1, 0.28, 0.9],
  },
  // RAM stick 4
  {
    id: "ram3",
    rest: [0.96, 0.34, -0.38],
    from: [3, 3.5, -2],
    range: [0.42, 0.5],
    color: "#2a7de1",
    geo: "slim-box",
    geoArgs: [0.1, 0.28, 0.9],
  },
  // NVMe SSD
  {
    id: "nvme",
    rest: [1.1, 0.28, 0.35],
    from: [4, 0, 2],
    range: [0.48, 0.6],
    color: "#222a3a",
    geo: "long-bar",
    geoArgs: [0.8, 0.05, 0.22],
  },
  // SSD 2
  {
    id: "nvme2",
    rest: [1.1, 0.28, 0.62],
    from: [4, 0.5, 2],
    range: [0.52, 0.62],
    color: "#222a3a",
    geo: "long-bar",
    geoArgs: [0.8, 0.05, 0.22],
  },
  // NIC card
  {
    id: "nic",
    rest: [-1.0, 0.32, -0.1],
    from: [-4, -1, 1],
    range: [0.6, 0.72],
    color: "#1e2e3e",
    geo: "slim-box",
    geoArgs: [0.7, 0.08, 0.42],
  },
  // PSU
  {
    id: "psu",
    rest: [-1.45, 0.26, 0.52],
    from: [-4, -2, -2],
    range: [0.7, 0.82],
    color: "#141820",
    geo: "box",
    geoArgs: [0.8, 0.3, 0.5],
  },
  // Top lid
  {
    id: "lid",
    rest: [0, 0.57, 0],
    from: [0, 4, 0],
    range: [0.82, 1.0],
    color: "#1e2330",
    geo: "box",
    geoArgs: [3.8, 0.08, 1.6],
  },
];

/* ─── scene internals ───────────────────────────────────────────────── */
const ServerPart: React.FC<{
  part: Part;
  progress: number;
  reduced: boolean;
}> = ({ part, progress, reduced }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = easeOut(segment(progress, part.range[0], part.range[1]));
  const [px, py, pz] = [
    lerp(part.from[0], part.rest[0], t),
    lerp(part.from[1], part.rest[1], t),
    lerp(part.from[2], part.rest[2], t),
  ];

  useFrame((_, delta) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.y += delta * 0.08;
  });

  let geometry: React.ReactNode;
  if (part.geo === "disk") {
    geometry = <cylinderGeometry args={[part.geoArgs[0], part.geoArgs[0], part.geoArgs[1], part.geoArgs[2] as number]} />;
  } else {
    geometry = <boxGeometry args={[part.geoArgs[0], part.geoArgs[1], part.geoArgs[2]]} />;
  }

  return (
    <mesh
      ref={meshRef}
      position={[px, py, pz]}
      scale={[t, t, t]}
    >
      {geometry}
      <meshStandardMaterial
        color={part.color}
        metalness={part.geo === "disk" ? 0.9 : 0.6}
        roughness={0.35}
        transparent
        opacity={t}
      />
    </mesh>
  );
};

/* subtle glow plane behind the server */
const GlowPlane: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = clamp01(progress * 2) * 0.12;
  return (
    <mesh position={[0, 0.2, -1]} rotation={[-0.2, 0, 0]}>
      <planeGeometry args={[6, 3.5]} />
      <meshBasicMaterial color="#4488ff" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

/* particle dust that floats in during assembly */
const DUST = 340;
const DustField: React.FC<{ progress: number; reduced: boolean }> = ({ progress, reduced }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6688bb"
        transparent
        opacity={progress * 0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

/* camera slow auto-rotate */
const CameraRig: React.FC<{ progress: number; reduced: boolean }> = ({ progress, reduced }) => {
  const { camera } = useThree();
  const angle = useRef(0);

  useFrame((_, delta) => {
    if (reduced) return;
    angle.current += delta * 0.06;
    const r = 5.5 - progress * 0.8;
    camera.position.x = Math.sin(angle.current) * r;
    camera.position.z = Math.cos(angle.current) * r;
    camera.position.y = lerp(1.8, 0.8, progress);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
};

/* ─── exported Canvas component ─────────────────────────────────────── */
const ServerScene: React.FC<ServerSceneProps> = ({ progress }) => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 1.8, 5.5], fov: 48 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow={false} />
      <directionalLight position={[-3, 2, -4]} intensity={0.5} color="#4488ff" />
      <pointLight position={[0, 2, 2]} intensity={0.6} color="#88aaff" />

      <GlowPlane progress={progress} />
      <DustField progress={progress} reduced={reduced} />
      <CameraRig progress={progress} reduced={reduced} />

      {PARTS.map((part) => (
        <ServerPart key={part.id} part={part} progress={progress} reduced={reduced} />
      ))}
    </Canvas>
  );
};

export default ServerScene;
