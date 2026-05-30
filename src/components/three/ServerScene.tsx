/**
 * ServerScene — scroll-driven 3D server assembly.
 *
 * Architecture: progressRef (mutable ref) is read every frame inside useFrame.
 * Zero React re-renders during animation — all mutations go directly to
 * THREE objects in the R3F render loop. Each component has its own spring
 * so parts overshoot slightly when they land (satisfying snap feel).
 */

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export interface ServerSceneProps {
  /** Mutable ref updated by Framer Motion spring — never triggers re-renders */
  progressRef: React.MutableRefObject<number>;
}

// ─── math helpers ─────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

// ─── per-component spring ─────────────────────────────────────────────────────
interface Sp { v: number; vel: number; }
/** velocity-based spring — allows ~5% overshoot for landing feel */
function tick(sp: Sp, target: number): number {
  const err = clamp01(target) - sp.v;
  sp.vel = sp.vel * 0.80 + err * 0.20;
  sp.v   = Math.min(1.05, Math.max(-0.02, sp.v + sp.vel));
  return sp.v;
}

// ─── batch-update all meshes in a group ───────────────────────────────────────
function applyT(group: THREE.Group, t: number) {
  const opacity = clamp01(t * 7);
  group.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const m = obj.material as THREE.MeshPhysicalMaterial;
    if (m.transparent) m.opacity = opacity;
    // LEDs / emissive elements
    if (m.emissive.getHex() !== 0) m.emissiveIntensity = t * 3.2;
  });
}

// ─── material presets ─────────────────────────────────────────────────────────
const MAT = {
  chassis:   { color: "#1c1f28", metalness: 0.88, roughness: 0.20 },
  pcb:       { color: "#0d2618", metalness: 0.10, roughness: 0.84 },
  ihs:       { color: "#c4c8d2", metalness: 0.96, roughness: 0.06, clearcoat: 0.55, clearcoatRoughness: 0.07 },
  aluminium: { color: "#9aaabb", metalness: 0.90, roughness: 0.18 },
  chip:      { color: "#111418", metalness: 0.35, roughness: 0.55 },
  gold:      { color: "#c8a018", metalness: 0.95, roughness: 0.10 },
  ramBody:   { color: "#0c1e2e", metalness: 0.12, roughness: 0.82 },
  ramSpread: { color: "#3a4050", metalness: 0.82, roughness: 0.22 },
  steel:     { color: "#111318", metalness: 0.82, roughness: 0.22 },
};

// ─── CHASSIS ──────────────────────────────────────────────────────────────────
const Chassis: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.00, 0.10));
    g.current.position.y = lerp(-3.0, 0, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[0, -3, 0]}>
      <mesh><boxGeometry args={[4.2, 0.44, 1.8]} /><meshPhysicalMaterial {...MAT.chassis} transparent opacity={0} /></mesh>
      <mesh position={[0, 0.225, 0]}><boxGeometry args={[4.2, 0.008, 1.8]} /><meshPhysicalMaterial color="#2e3248" metalness={0.7} roughness={0.35} transparent opacity={0} /></mesh>
      {/* front bezel */}
      <mesh position={[0, 0, -0.905]}><boxGeometry args={[4.2, 0.44, 0.01]} /><meshPhysicalMaterial color="#14161f" metalness={0.72} roughness={0.42} transparent opacity={0} /></mesh>
      {/* vent slots */}
      {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7].map((x) => (
        <mesh key={x} position={[x, 0, -0.912]}><boxGeometry args={[0.065, 0.28, 0.002]} /><meshPhysicalMaterial color="#090b11" transparent opacity={0} /></mesh>
      ))}
      {/* HDD cage lines */}
      {[-0.12, 0, 0.12].map((y) => (
        <mesh key={y} position={[-0.8, y, -0.912]}><boxGeometry args={[1.4, 0.01, 0.002]} /><meshPhysicalMaterial color="#0d0f15" transparent opacity={0} /></mesh>
      ))}
      {/* LEDs */}
      <mesh position={[-1.88, 0.04, -0.912]}><boxGeometry args={[0.09, 0.04, 0.003]} /><meshPhysicalMaterial color="#22dd55" emissive={new THREE.Color("#22dd55")} emissiveIntensity={0} transparent opacity={0} /></mesh>
      <mesh position={[-1.73, 0.04, -0.912]}><boxGeometry args={[0.06, 0.03, 0.003]} /><meshPhysicalMaterial color="#44aaff" emissive={new THREE.Color("#44aaff")} emissiveIntensity={0} transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── MOTHERBOARD ──────────────────────────────────────────────────────────────
const Motherboard: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.08, 0.20));
    g.current.position.y = lerp(2.0, 0.24, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[0, 2.0, 0]}>
      <mesh><boxGeometry args={[3.8, 0.055, 1.55]} /><meshPhysicalMaterial {...MAT.pcb} transparent opacity={0} /></mesh>
      {/* CPU socket area */}
      <mesh position={[-0.45, 0.03, 0.05]}><boxGeometry args={[0.74, 0.008, 0.74]} /><meshPhysicalMaterial color="#112a1c" metalness={0.2} roughness={0.7} transparent opacity={0} /></mesh>
      {/* copper traces */}
      {[[-1.2, 0.0], [0.2, 0.28], [0.9, -0.3], [1.5, 0.2], [-0.5, -0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.03, z]}><boxGeometry args={[0.5 + (i % 3) * 0.15, 0.002, 0.003]} /><meshPhysicalMaterial color="#c89010" emissive={new THREE.Color("#c89010")} emissiveIntensity={0} transparent opacity={0} /></mesh>
      ))}
      {/* VRM caps */}
      {[-0.1, 0, 0.1].map((z) => (
        <mesh key={z} position={[-0.88, 0.04, z]}><boxGeometry args={[0.07, 0.045, 0.06]} /><meshPhysicalMaterial color="#1a1a22" metalness={0.5} roughness={0.48} transparent opacity={0} /></mesh>
      ))}
      {/* chipset */}
      <mesh position={[0.52, 0.045, 0.28]}><boxGeometry args={[0.24, 0.02, 0.24]} /><meshPhysicalMaterial {...MAT.chip} transparent opacity={0} /></mesh>
      {/* PCIe slot */}
      <mesh position={[-1.04, 0.04, -0.14]}><boxGeometry args={[0.86, 0.014, 0.11]} /><meshPhysicalMaterial color="#1a1a22" metalness={0.45} roughness={0.44} transparent opacity={0} /></mesh>
      {/* ATX power connector */}
      <mesh position={[1.62, 0.07, 0.33]}><boxGeometry args={[0.24, 0.08, 0.14]} /><meshPhysicalMaterial color="#181818" metalness={0.3} roughness={0.7} transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── CPU ──────────────────────────────────────────────────────────────────────
const CPU: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.18, 0.30));
    g.current.position.y = lerp(2.4, 0.355, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[-0.45, 2.4, 0.05]}>
      <mesh position={[0, -0.025, 0]}><boxGeometry args={[0.68, 0.01, 0.68]} /><meshPhysicalMaterial color="#182814" metalness={0.1} roughness={0.9} transparent opacity={0} /></mesh>
      <mesh><boxGeometry args={[0.62, 0.07, 0.62]} /><meshPhysicalMaterial {...MAT.ihs} transparent opacity={0} /></mesh>
      <mesh position={[0, 0.037, 0.05]}><boxGeometry args={[0.38, 0.001, 0.09]} /><meshPhysicalMaterial color="#aab0bc" transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── CPU COOLER ───────────────────────────────────────────────────────────────
const CPUCooler: React.FC<{ pr: React.MutableRefObject<number>; reduced: boolean }> = ({ pr, reduced }) => {
  const g = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame((_, delta) => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.25, 0.37));
    g.current.position.y = lerp(2.7, 0.52, t);
    applyT(g.current, t);
    if (fanRef.current && !reduced && t > 0.3) {
      fanRef.current.rotation.y += delta * (2 + t * 8);
    }
  });
  return (
    <group ref={g} position={[-0.45, 2.7, 0.05]}>
      <mesh position={[0, -0.02, 0]}><boxGeometry args={[0.63, 0.04, 0.63]} /><meshPhysicalMaterial {...MAT.aluminium} transparent opacity={0} /></mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[0, 0.025 + i * 0.042, 0]}>
          <boxGeometry args={[0.61 - i * 0.008, 0.024, 0.61 - i * 0.008]} />
          <meshPhysicalMaterial color={i % 2 === 0 ? "#a8bac8" : "#8899aa"} metalness={0.88} roughness={0.14} transparent opacity={0} />
        </mesh>
      ))}
      <mesh position={[0, 0.41, 0]}><cylinderGeometry args={[0.28, 0.28, 0.06, 28]} /><meshPhysicalMaterial color="#1c1f2a" metalness={0.62} roughness={0.38} transparent opacity={0} /></mesh>
      <group ref={fanRef} position={[0, 0.41, 0]}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <mesh key={deg} rotation={[0, (deg * Math.PI) / 180, 0]} position={[0.11, 0, 0]}>
            <boxGeometry args={[0.1, 0.024, 0.072]} />
            <meshPhysicalMaterial color="#2a2f3c" metalness={0.52} roughness={0.48} transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ─── RAM STICK ────────────────────────────────────────────────────────────────
const RAMStick: React.FC<{ pr: React.MutableRefObject<number>; x: number; segStart: number; segEnd: number }> = ({ pr, x, segStart, segEnd }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, segStart, segEnd));
    g.current.position.z = lerp(-3.0, -0.42, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[x, 0.35, -3.0]}>
      <mesh><boxGeometry args={[0.1, 0.3, 1.0]} /><meshPhysicalMaterial {...MAT.ramBody} transparent opacity={0} /></mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.058, 0.01, 0]}><boxGeometry args={[0.012, 0.28, 0.96]} /><meshPhysicalMaterial {...MAT.ramSpread} transparent opacity={0} /></mesh>
      ))}
      {[-0.34, -0.12, 0.12, 0.34].map((zo) => (
        <mesh key={zo} position={[0.055, 0.02, zo]}><boxGeometry args={[0.016, 0.1, 0.14]} /><meshPhysicalMaterial {...MAT.chip} transparent opacity={0} /></mesh>
      ))}
      <mesh position={[0, -0.173, 0]}><boxGeometry args={[0.1, 0.024, 0.9]} /><meshPhysicalMaterial {...MAT.gold} transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── NVME ─────────────────────────────────────────────────────────────────────
const NVMe: React.FC<{ pr: React.MutableRefObject<number>; z: number; segStart: number; segEnd: number }> = ({ pr, z, segStart, segEnd }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, segStart, segEnd));
    g.current.position.x = lerp(3.8, 1.05, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[3.8, 0.27, z]}>
      <mesh><boxGeometry args={[0.88, 0.038, 0.22]} /><meshPhysicalMaterial color="#0a1a14" metalness={0.12} roughness={0.82} transparent opacity={0} /></mesh>
      <mesh position={[-0.12, 0.03, 0]}><boxGeometry args={[0.2, 0.02, 0.16]} /><meshPhysicalMaterial {...MAT.chip} transparent opacity={0} /></mesh>
      {[0.17, 0.36].map((xo) => (
        <mesh key={xo} position={[xo, 0.03, 0]}><boxGeometry args={[0.14, 0.022, 0.18]} /><meshPhysicalMaterial color="#0e1216" metalness={0.3} roughness={0.6} transparent opacity={0} /></mesh>
      ))}
      <mesh position={[-0.385, -0.004, 0]}><boxGeometry args={[0.08, 0.028, 0.18]} /><meshPhysicalMaterial {...MAT.gold} transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── NIC ──────────────────────────────────────────────────────────────────────
const NIC: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.63, 0.75));
    g.current.position.y = lerp(2.2, 0.35, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[-1.02, 2.2, -0.1]}>
      <mesh><boxGeometry args={[0.76, 0.065, 0.46]} /><meshPhysicalMaterial {...MAT.pcb} transparent opacity={0} /></mesh>
      <mesh position={[-0.385, -0.04, 0]}><boxGeometry args={[0.03, 0.18, 0.46]} /><meshPhysicalMaterial color="#222830" metalness={0.78} roughness={0.28} transparent opacity={0} /></mesh>
      {[-0.1, 0.1].map((zo) => (
        <mesh key={zo} position={[-0.39, 0.05, zo]}><boxGeometry args={[0.026, 0.1, 0.14]} /><meshPhysicalMaterial color="#1c1f26" metalness={0.35} roughness={0.65} transparent opacity={0} /></mesh>
      ))}
      {/* link LEDs — emissive */}
      {[-0.1, 0.1].map((zo) => (
        <mesh key={zo} position={[-0.39, 0.125, zo]}><boxGeometry args={[0.008, 0.022, 0.04]} /><meshPhysicalMaterial color="#22dd55" emissive={new THREE.Color("#22dd55")} emissiveIntensity={0} transparent opacity={0} /></mesh>
      ))}
      {[0.08, 0.3].map((xo) => (
        <mesh key={xo} position={[xo, 0.052, 0]}><boxGeometry args={[0.14, 0.025, 0.12]} /><meshPhysicalMaterial {...MAT.chip} transparent opacity={0} /></mesh>
      ))}
    </group>
  );
};

// ─── PSU ──────────────────────────────────────────────────────────────────────
const PSU: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.73, 0.85));
    g.current.position.x = lerp(-4.2, -1.46, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[-4.2, 0.26, 0.52]}>
      <mesh><boxGeometry args={[0.88, 0.32, 0.52]} /><meshPhysicalMaterial {...MAT.steel} transparent opacity={0} /></mesh>
      <mesh position={[0, 0, -0.265]}><cylinderGeometry args={[0.13, 0.13, 0.01, 24]} /><meshPhysicalMaterial color="#0a0c10" metalness={0.5} roughness={0.55} transparent opacity={0} /></mesh>
      {[-0.07, 0, 0.07].map((d) => (
        <mesh key={d} position={[d, 0, -0.261]}><boxGeometry args={[0.006, 0.24, 0.006]} /><meshPhysicalMaterial color="#1a1d24" transparent opacity={0} /></mesh>
      ))}
      <mesh position={[0.44, 0, 0]}><boxGeometry args={[0.014, 0.28, 0.44]} /><meshPhysicalMaterial color="#1c2028" metalness={0.6} roughness={0.4} transparent opacity={0} /></mesh>
    </group>
  );
};

// ─── LID ──────────────────────────────────────────────────────────────────────
const Lid: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.87, 1.00));
    g.current.position.y = lerp(3.0, 0.58, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[0, 3.0, 0]}>
      <mesh><boxGeometry args={[4.2, 0.07, 1.8]} /><meshPhysicalMaterial color="#1e2232" metalness={0.88} roughness={0.18} transparent opacity={0} /></mesh>
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8].map((x) => (
        <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[0.11, 0.072, 1.6]} /><meshPhysicalMaterial color="#13151d" metalness={0.7} roughness={0.3} transparent opacity={0} /></mesh>
      ))}
    </group>
  );
};

// ─── ASSEMBLY GLOW LIGHT ──────────────────────────────────────────────────────
/** A dynamic point light that pulses when a component arrives */
const ArrivalLight: React.FC<{ pr: React.MutableRefObject<number>; segStart: number; pos: [number, number, number]; color: string }> = ({ pr, segStart, pos, color }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const prev = useRef(0);
  const glow = useRef(0);
  useFrame((_, delta) => {
    if (!lightRef.current) return;
    const p = pr.current;
    const curr = seg(p, segStart, segStart + 0.02);
    if (curr > 0.1 && prev.current < 0.1) {
      glow.current = 1.0; // trigger pulse
    }
    prev.current = curr;
    glow.current = Math.max(0, glow.current - delta * 1.8);
    lightRef.current.intensity = glow.current * 3.5;
  });
  return <pointLight ref={lightRef} position={pos} color={color} intensity={0} distance={3} />;
};

// ─── CAMERA RIG ───────────────────────────────────────────────────────────────
const CameraRig: React.FC<{ pr: React.MutableRefObject<number>; reduced: boolean }> = ({ pr, reduced }) => {
  const { camera } = useThree();
  const angle = useRef(0.4);
  const camY = useRef(2.2);
  const radius = useRef(5.8);
  useFrame((_, delta) => {
    if (reduced) return;
    angle.current += delta * 0.04;
    const p = pr.current;
    const targetR = 5.8 - p * 0.8;
    const targetY = lerp(2.2, 1.0, p);
    radius.current += (targetR - radius.current) * 0.04;
    camY.current   += (targetY - camY.current)   * 0.04;
    camera.position.x = Math.sin(angle.current) * radius.current;
    camera.position.z = Math.cos(angle.current) * radius.current;
    camera.position.y = camY.current;
    camera.lookAt(0, 0.28, 0);
  });
  return null;
};

// ─── GROUND GRID ──────────────────────────────────────────────────────────────
const GroundGrid: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = pr.current * 0.18;
  });
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]}>
      <planeGeometry args={[14, 8, 24, 14]} />
      <meshBasicMaterial color="#3355aa" wireframe transparent opacity={0} depthWrite={false} />
    </mesh>
  );
};

// ─── EXPORTED CANVAS ──────────────────────────────────────────────────────────
const ServerScene: React.FC<ServerSceneProps> = ({ progressRef }) => {
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
      camera={{ position: [1.5, 2.2, 5.8], fov: 46 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      {/* IBL — makes PBR materials look real */}
      <Environment preset="studio" environmentIntensity={0.65} />

      {/* scene lights */}
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 9, 4]} intensity={1.7} color="#ffffff" castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.55} color="#5588ff" />
      <pointLight position={[0, 3.5, 1.5]} intensity={0.9} color="#88aaff" distance={10} />

      {/* per-component arrival flash lights */}
      <ArrivalLight pr={progressRef} segStart={0.00} pos={[0, 0.5, 0]}    color="#aaddff" />
      <ArrivalLight pr={progressRef} segStart={0.18} pos={[-0.45, 1, 0.05]} color="#ffddaa" />
      <ArrivalLight pr={progressRef} segStart={0.33} pos={[0.55, 1, -0.42]} color="#44aaff" />
      <ArrivalLight pr={progressRef} segStart={0.51} pos={[1.05, 0.8, 0.4]} color="#aaffdd" />
      <ArrivalLight pr={progressRef} segStart={0.63} pos={[-1, 1, -0.1]}   color="#66ffbb" />
      <ArrivalLight pr={progressRef} segStart={0.73} pos={[-1.5, 0.8, 0.5]} color="#ffaa44" />

      {/* soft ground shadow */}
      <ContactShadows position={[0, -0.22, 0]} opacity={0.6} scale={10} blur={2.8} far={1.4} color="#000000" />

      {/* wireframe floor grid */}
      <GroundGrid pr={progressRef} />

      {/* atmospheric depth fog */}
      <fog attach="fog" args={["#0a0c16", 10, 26]} />

      <CameraRig pr={progressRef} reduced={reduced} />

      {/* ── assembly sequence ── */}
      <Chassis  pr={progressRef} />
      <Motherboard pr={progressRef} />
      <CPU      pr={progressRef} />
      <CPUCooler pr={progressRef} reduced={reduced} />
      <RAMStick  pr={progressRef} x={0.22} segStart={0.33} segEnd={0.45} />
      <RAMStick  pr={progressRef} x={0.46} segStart={0.37} segEnd={0.48} />
      <RAMStick  pr={progressRef} x={0.70} segStart={0.41} segEnd={0.51} />
      <RAMStick  pr={progressRef} x={0.94} segStart={0.45} segEnd={0.54} />
      <NVMe     pr={progressRef} z={0.28} segStart={0.51} segEnd={0.63} />
      <NVMe     pr={progressRef} z={0.56} segStart={0.55} segEnd={0.66} />
      <NIC      pr={progressRef} />
      <PSU      pr={progressRef} />
      <Lid      pr={progressRef} />
    </Canvas>
  );
};

export default ServerScene;
