/**
 * ServerScene — scroll-driven 3D server assembly, render-quality pass.
 *
 * Realism techniques:
 *  · RoundedBox (beveled edges) instead of hard boxes — real hardware has chamfers
 *  · ACES Filmic tone mapping + correct color space
 *  · EffectComposer post-fx: selective Bloom on LEDs, ambient vignette, SMAA
 *  · 3-point lighting (key / fill / rim) + studio HDRI for reflections
 *  · Per-component velocity spring (slight overshoot), driven entirely in
 *    useFrame via a mutable progressRef — zero React re-renders.
 */

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";

export interface ServerSceneProps {
  progressRef: React.MutableRefObject<number>;
}

// ─── math ───────────────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

interface Sp { v: number; vel: number; }
function tick(sp: Sp, target: number): number {
  const err = clamp01(target) - sp.v;
  sp.vel = sp.vel * 0.80 + err * 0.20;
  sp.v = Math.min(1.04, Math.max(-0.02, sp.v + sp.vel));
  return sp.v;
}

function applyT(group: THREE.Group, t: number) {
  const opacity = clamp01(t * 7);
  group.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const m = obj.material as THREE.MeshPhysicalMaterial;
    if (m.transparent) m.opacity = opacity;
    if (m.emissive && m.emissive.getHex() !== 0) m.emissiveIntensity = t * 4.0;
  });
}

// ─── beveled box helper ───────────────────────────────────────────────────────
const RBox: React.FC<{
  size: [number, number, number];
  position?: [number, number, number];
  radius?: number;
  mat: Record<string, unknown>;
}> = ({ size, position, radius = 0.012, mat }) => (
  <RoundedBox args={size} radius={Math.min(radius, Math.min(...size) / 2.2)} smoothness={3} position={position}>
    <meshPhysicalMaterial transparent opacity={0} {...mat} />
  </RoundedBox>
);

// ─── material presets ─────────────────────────────────────────────────────────
const MAT = {
  chassis:   { color: "#23262f", metalness: 0.9,  roughness: 0.28, clearcoat: 0.3, clearcoatRoughness: 0.4 },
  chassisDk: { color: "#15171e", metalness: 0.8,  roughness: 0.4 },
  lid:       { color: "#272b38", metalness: 0.92, roughness: 0.22, clearcoat: 0.4, clearcoatRoughness: 0.3 },
  pcb:       { color: "#0e3a22", metalness: 0.05, roughness: 0.7,  clearcoat: 0.6, clearcoatRoughness: 0.35 },
  pcbBlue:   { color: "#10293e", metalness: 0.05, roughness: 0.65, clearcoat: 0.6, clearcoatRoughness: 0.35 },
  ihs:       { color: "#cdd2dc", metalness: 0.98, roughness: 0.05, clearcoat: 0.7, clearcoatRoughness: 0.05 },
  aluminium: { color: "#aab4c2", metalness: 0.95, roughness: 0.14 },
  aluDark:   { color: "#8893a3", metalness: 0.92, roughness: 0.2 },
  chip:      { color: "#15181f", metalness: 0.4,  roughness: 0.5 },
  chipMatte: { color: "#0c0e13", metalness: 0.25, roughness: 0.7 },
  gold:      { color: "#d4a92a", metalness: 0.98, roughness: 0.18 },
  ramSpread: { color: "#414857", metalness: 0.85, roughness: 0.25 },
  steel:     { color: "#1a1d25", metalness: 0.85, roughness: 0.25 },
  copper:    { color: "#c8821e", metalness: 0.7,  roughness: 0.4, emissive: new THREE.Color("#7a4d10"), emissiveIntensity: 0 },
};
const led = (hex: string) => ({ color: hex, emissive: new THREE.Color(hex), emissiveIntensity: 0, metalness: 0, roughness: 0.4 });

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
      <RBox size={[4.2, 0.44, 1.8]} radius={0.04} mat={MAT.chassis} />
      {/* inner tray (darker, recessed) */}
      <RBox size={[3.95, 0.2, 1.6]} position={[0, 0.13, 0]} radius={0.02} mat={MAT.chassisDk} />
      {/* front bezel */}
      <RBox size={[4.2, 0.44, 0.04]} position={[0, 0, -0.9]} radius={0.03} mat={MAT.chassisDk} />
      {/* vent slots */}
      {[0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7].map((x) => (
        <RBox key={x} size={[0.05, 0.28, 0.01]} position={[x, 0, -0.922]} radius={0.004} mat={{ color: "#070910", metalness: 0.3, roughness: 0.8 }} />
      ))}
      {/* HDD cage drive bays */}
      {[-0.13, 0, 0.13].map((y) => (
        <RBox key={y} size={[1.4, 0.1, 0.02]} position={[-0.78, y, -0.922]} radius={0.01} mat={{ color: "#0c0e15", metalness: 0.6, roughness: 0.4 }} />
      ))}
      {/* power LED — green */}
      <RBox size={[0.1, 0.045, 0.012]} position={[-1.9, 0.05, -0.922]} radius={0.006} mat={led("#33ff66")} />
      {/* activity LED — blue */}
      <RBox size={[0.07, 0.035, 0.012]} position={[-1.74, 0.05, -0.922]} radius={0.005} mat={led("#4ab8ff")} />
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
      <RBox size={[3.8, 0.05, 1.55]} radius={0.02} mat={MAT.pcb} />
      {/* CPU socket frame */}
      <RBox size={[0.78, 0.02, 0.78]} position={[-0.45, 0.035, 0.05]} radius={0.01} mat={{ color: "#0a0c10", metalness: 0.6, roughness: 0.4 }} />
      <RBox size={[0.68, 0.012, 0.68]} position={[-0.45, 0.04, 0.05]} radius={0.008} mat={{ color: "#1a1e26", metalness: 0.7, roughness: 0.35 }} />
      {/* copper traces (emissive glow) */}
      {[[-1.2, 0.0, 0.6], [0.25, 0.3, 0.5], [0.9, -0.3, 0.7], [1.4, 0.2, 0.4], [-0.5, -0.5, 0.55]].map(([x, z, w], i) => (
        <RBox key={i} size={[w as number, 0.004, 0.006]} position={[x, 0.03, z]} radius={0.002} mat={MAT.copper} />
      ))}
      {/* VRM heatsink */}
      <RBox size={[0.5, 0.12, 0.18]} position={[-0.9, 0.07, 0]} radius={0.01} mat={MAT.aluDark} />
      {/* chipset heatsink */}
      <RBox size={[0.26, 0.06, 0.26]} position={[0.52, 0.05, 0.28]} radius={0.01} mat={MAT.aluminium} />
      {/* PCIe slot */}
      <RBox size={[0.88, 0.04, 0.12]} position={[-1.04, 0.04, -0.16]} radius={0.008} mat={{ color: "#181b22", metalness: 0.5, roughness: 0.4 }} />
      {/* ATX 24-pin */}
      <RBox size={[0.26, 0.1, 0.15]} position={[1.62, 0.075, 0.33]} radius={0.01} mat={MAT.chip} />
      {/* SATA ports */}
      {[-0.06, 0.06].map((z) => (
        <RBox key={z} size={[0.16, 0.05, 0.07]} position={[1.6, 0.05, -0.4 + z]} radius={0.006} mat={{ color: "#1c2a4a", metalness: 0.4, roughness: 0.5 }} />
      ))}
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
    g.current.rotation.y = lerp(0.6, 0, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[-0.45, 2.4, 0.05]}>
      {/* green substrate */}
      <RBox size={[0.68, 0.018, 0.68]} position={[0, -0.026, 0]} radius={0.006} mat={MAT.pcb} />
      {/* polished IHS */}
      <RBox size={[0.6, 0.07, 0.6]} radius={0.025} mat={MAT.ihs} />
      {/* notch detail */}
      <RBox size={[0.36, 0.002, 0.1]} position={[0, 0.038, 0.06]} radius={0.001} mat={{ color: "#9aa0ac", metalness: 0.6, roughness: 0.5 }} />
    </group>
  );
};

// ─── CPU COOLER ───────────────────────────────────────────────────────────────
const CPUCooler: React.FC<{ pr: React.MutableRefObject<number>; reduced: boolean }> = ({ pr, reduced }) => {
  const g = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame((_, delta) => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.25, 0.37));
    g.current.position.y = lerp(2.7, 0.52, t);
    applyT(g.current, t);
    if (fan.current && !reduced && t > 0.3) fan.current.rotation.y += delta * (2 + t * 9);
  });
  return (
    <group ref={g} position={[-0.45, 2.7, 0.05]}>
      <RBox size={[0.62, 0.04, 0.62]} position={[0, -0.02, 0]} radius={0.01} mat={MAT.aluminium} />
      {/* heat-pipe fins */}
      {Array.from({ length: 11 }).map((_, i) => (
        <RBox key={i} size={[0.6 - i * 0.006, 0.018, 0.6 - i * 0.006]} position={[0, 0.02 + i * 0.036, 0]} radius={0.004} mat={i % 2 === 0 ? MAT.aluminium : MAT.aluDark} />
      ))}
      {/* fan shroud */}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.07, 32]} />
        <meshPhysicalMaterial color="#1a1d28" metalness={0.6} roughness={0.4} transparent opacity={0} />
      </mesh>
      {/* spinning blades */}
      <group ref={fan} position={[0, 0.43, 0]}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <mesh key={deg} rotation={[0, (deg * Math.PI) / 180, 0.3]} position={[0.12, 0, 0]}>
            <boxGeometry args={[0.13, 0.02, 0.08]} />
            <meshPhysicalMaterial color="#2c3240" metalness={0.5} roughness={0.45} transparent opacity={0} />
          </mesh>
        ))}
        {/* hub */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshPhysicalMaterial color="#16181f" metalness={0.6} roughness={0.4} transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
};

// ─── RAM ──────────────────────────────────────────────────────────────────────
const RAMStick: React.FC<{ pr: React.MutableRefObject<number>; x: number; s: number; e: number }> = ({ pr, x, s, e }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, s, e));
    g.current.position.z = lerp(-3.0, -0.42, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[x, 0.35, -3.0]}>
      <RBox size={[0.1, 0.3, 1.0]} radius={0.01} mat={MAT.pcbBlue} />
      {/* heat spreaders */}
      {[-1, 1].map((d) => (
        <RBox key={d} size={[0.018, 0.3, 0.96]} position={[d * 0.06, 0.02, 0]} radius={0.006} mat={MAT.ramSpread} />
      ))}
      {/* spreader fin comb on top */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((z) => (
        <RBox key={z} size={[0.14, 0.04, 0.04]} position={[0, 0.18, z]} radius={0.004} mat={MAT.aluDark} />
      ))}
      {/* gold contacts */}
      <RBox size={[0.1, 0.026, 0.9]} position={[0, -0.173, 0]} radius={0.004} mat={MAT.gold} />
    </group>
  );
};

// ─── NVMe ─────────────────────────────────────────────────────────────────────
const NVMe: React.FC<{ pr: React.MutableRefObject<number>; z: number; s: number; e: number }> = ({ pr, z, s, e }) => {
  const g = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame(() => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, s, e));
    g.current.position.x = lerp(3.8, 1.05, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[3.8, 0.27, z]}>
      <RBox size={[0.88, 0.035, 0.22]} radius={0.008} mat={MAT.pcb} />
      {/* controller */}
      <RBox size={[0.2, 0.03, 0.16]} position={[-0.12, 0.03, 0]} radius={0.005} mat={MAT.chip} />
      {/* NAND chips */}
      {[0.17, 0.36].map((xo) => (
        <RBox key={xo} size={[0.14, 0.026, 0.18]} position={[xo, 0.03, 0]} radius={0.004} mat={MAT.chipMatte} />
      ))}
      {/* M.2 gold edge */}
      <RBox size={[0.08, 0.026, 0.18]} position={[-0.385, -0.002, 0]} radius={0.003} mat={MAT.gold} />
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
      <RBox size={[0.76, 0.05, 0.46]} radius={0.01} mat={MAT.pcb} />
      {/* I/O bracket */}
      <RBox size={[0.04, 0.2, 0.46]} position={[-0.39, -0.04, 0]} radius={0.006} mat={MAT.aluminium} />
      {/* RJ45 ports */}
      {[-0.1, 0.1].map((z) => (
        <RBox key={z} size={[0.03, 0.11, 0.14]} position={[-0.4, 0.05, z]} radius={0.005} mat={{ color: "#1a1d24", metalness: 0.5, roughness: 0.5 }} />
      ))}
      {/* link LEDs */}
      {[-0.1, 0.1].map((z) => (
        <RBox key={z} size={[0.012, 0.024, 0.045]} position={[-0.41, 0.13, z]} radius={0.003} mat={led("#33ff66")} />
      ))}
      {/* controller + heatsink */}
      <RBox size={[0.16, 0.06, 0.14]} position={[0.08, 0.055, 0]} radius={0.006} mat={MAT.aluDark} />
      <RBox size={[0.14, 0.03, 0.12]} position={[0.3, 0.045, 0]} radius={0.005} mat={MAT.chip} />
    </group>
  );
};

// ─── PSU ──────────────────────────────────────────────────────────────────────
const PSU: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const g = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Group>(null);
  const sp = useRef<Sp>({ v: 0, vel: 0 });
  useFrame((_, delta) => {
    if (!g.current) return;
    const t = tick(sp.current, seg(pr.current, 0.73, 0.85));
    g.current.position.x = lerp(-4.2, -1.46, t);
    applyT(g.current, t);
    if (fan.current && t > 0.5) fan.current.rotation.z += delta * 4;
  });
  return (
    <group ref={g} position={[-4.2, 0.26, 0.52]}>
      <RBox size={[0.88, 0.32, 0.52]} radius={0.02} mat={MAT.steel} />
      {/* fan grill ring */}
      <mesh position={[0, 0, -0.27]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.012, 8, 24]} />
        <meshPhysicalMaterial color="#0a0c10" metalness={0.6} roughness={0.4} transparent opacity={0} />
      </mesh>
      {/* fan blades */}
      <group ref={fan} position={[0, 0, -0.255]}>
        {[0, 51, 102, 153, 204, 255, 306].map((deg) => (
          <mesh key={deg} rotation={[Math.PI / 2, 0, (deg * Math.PI) / 180]} position={[0, 0.06, 0]}>
            <boxGeometry args={[0.05, 0.005, 0.09]} />
            <meshPhysicalMaterial color="#181b22" metalness={0.4} roughness={0.5} transparent opacity={0} />
          </mesh>
        ))}
      </group>
      {/* output cable bundle stub */}
      <RBox size={[0.05, 0.28, 0.44]} position={[0.45, 0, 0]} radius={0.01} mat={{ color: "#202430", metalness: 0.5, roughness: 0.5 }} />
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
    g.current.position.y = lerp(3.2, 0.6, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[0, 3.2, 0]}>
      <RBox size={[4.2, 0.06, 1.8]} radius={0.03} mat={MAT.lid} />
      {/* perforated vent panels */}
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8].map((x) => (
        <RBox key={x} size={[0.1, 0.062, 1.5]} position={[x, -0.001, 0]} radius={0.008} mat={MAT.chassisDk} />
      ))}
      {/* brand strip */}
      <RBox size={[0.9, 0.064, 0.18]} position={[1.5, 0.001, 0.6]} radius={0.006} mat={{ color: "#33373f", metalness: 0.9, roughness: 0.2 }} />
    </group>
  );
};

// ─── arrival flash light ──────────────────────────────────────────────────────
const ArrivalLight: React.FC<{ pr: React.MutableRefObject<number>; at: number; pos: [number, number, number]; color: string }> = ({ pr, at, pos, color }) => {
  const ref = useRef<THREE.PointLight>(null);
  const prev = useRef(0);
  const glow = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const curr = seg(pr.current, at, at + 0.02);
    if (curr > 0.1 && prev.current < 0.1) glow.current = 1.0;
    prev.current = curr;
    glow.current = Math.max(0, glow.current - delta * 1.6);
    ref.current.intensity = glow.current * 5;
  });
  return <pointLight ref={ref} position={pos} color={color} intensity={0} distance={3.5} />;
};

// ─── camera ───────────────────────────────────────────────────────────────────
const CameraRig: React.FC<{ pr: React.MutableRefObject<number>; reduced: boolean }> = ({ pr, reduced }) => {
  const { camera } = useThree();
  const angle = useRef(0.4);
  const camY = useRef(2.4);
  const radius = useRef(6.0);
  useFrame((_, delta) => {
    if (reduced) return;
    angle.current += delta * 0.035;
    const p = pr.current;
    radius.current += ((6.0 - p * 1.0) - radius.current) * 0.04;
    camY.current += ((lerp(2.4, 1.05, p)) - camY.current) * 0.04;
    camera.position.x = Math.sin(angle.current) * radius.current;
    camera.position.z = Math.cos(angle.current) * radius.current;
    camera.position.y = camY.current;
    camera.lookAt(0, 0.3, 0);
  });
  return null;
};

// ─── ground grid ──────────────────────────────────────────────────────────────
const GroundGrid: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = pr.current * 0.14;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, 0]}>
      <planeGeometry args={[16, 9, 28, 16]} />
      <meshBasicMaterial color="#3a5ba8" wireframe transparent opacity={0} depthWrite={false} />
    </mesh>
  );
};

// ─── canvas ───────────────────────────────────────────────────────────────────
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
      camera={{ position: [1.6, 2.4, 6.0], fov: 44 }}
      dpr={[1, 1.7]}
      gl={{
        antialias: false, // SMAA handles AA in post
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      frameloop="always"
    >
      {/* HDRI reflections */}
      <Environment preset="studio" environmentIntensity={0.7} />

      {/* 3-point lighting */}
      <ambientLight intensity={0.18} />
      <directionalLight position={[6, 10, 5]} intensity={2.0} color="#fff6ec" />
      <directionalLight position={[-5, 4, -4]} intensity={0.7} color="#5e8cff" />
      <spotLight position={[0, 7, -3]} angle={0.5} penumbra={0.8} intensity={1.2} color="#aaccff" />

      <ArrivalLight pr={progressRef} at={0.00} pos={[0, 0.5, 0]}     color="#bfe4ff" />
      <ArrivalLight pr={progressRef} at={0.18} pos={[-0.45, 1, 0.05]} color="#ffe2b0" />
      <ArrivalLight pr={progressRef} at={0.33} pos={[0.55, 1, -0.42]} color="#4ab8ff" />
      <ArrivalLight pr={progressRef} at={0.51} pos={[1.05, 0.8, 0.4]} color="#b0ffe0" />
      <ArrivalLight pr={progressRef} at={0.63} pos={[-1, 1, -0.1]}    color="#7affc0" />
      <ArrivalLight pr={progressRef} at={0.73} pos={[-1.5, 0.8, 0.5]} color="#ffbb55" />

      <ContactShadows position={[0, -0.23, 0]} opacity={0.65} scale={11} blur={3} far={1.6} color="#000000" resolution={1024} />
      <GroundGrid pr={progressRef} />

      <fog attach="fog" args={["#0a0c16", 11, 28]} />

      <CameraRig pr={progressRef} reduced={reduced} />

      <Chassis     pr={progressRef} />
      <Motherboard pr={progressRef} />
      <CPU         pr={progressRef} />
      <CPUCooler   pr={progressRef} reduced={reduced} />
      <RAMStick    pr={progressRef} x={0.22} s={0.33} e={0.45} />
      <RAMStick    pr={progressRef} x={0.46} s={0.37} e={0.48} />
      <RAMStick    pr={progressRef} x={0.70} s={0.41} e={0.51} />
      <RAMStick    pr={progressRef} x={0.94} s={0.45} e={0.54} />
      <NVMe        pr={progressRef} z={0.28} s={0.51} e={0.63} />
      <NVMe        pr={progressRef} z={0.56} s={0.55} e={0.66} />
      <NIC         pr={progressRef} />
      <PSU         pr={progressRef} />
      <Lid         pr={progressRef} />

      {/* post-processing — the realism multiplier */}
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.3}
          mipmapBlur
          radius={0.7}
        />
        <Vignette offset={0.32} darkness={0.62} eskil={false} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
};

export default ServerScene;
