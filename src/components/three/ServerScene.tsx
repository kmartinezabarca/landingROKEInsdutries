/**
 * ServerScene — performance-optimised version.
 *
 * Key decisions vs. the previous pass:
 *  · MeshStandardMaterial everywhere except CPU IHS (one clearcoat material)
 *    → far fewer shader variants to compile on first mount
 *  · No EffectComposer (Bloom/SMAA were the main frame-budget killers)
 *    → LED glow is faked with small PointLights updated in useFrame
 *  · No ContactShadows (re-renders the scene every frame)
 *    → replaced with a canvas-gradient soft-shadow decal (zero runtime cost)
 *  · RoundedBox smoothness=2 instead of 3
 *  · dpr capped at 1.4
 *  · hardware antialias: true (no SMAA overhead)
 *  · All animation still runs entirely in useFrame via progressRef
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export interface ServerSceneProps {
  progressRef: React.MutableRefObject<number>;
}

// ─── math ─────────────────────────────────────────────────────────────────────
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
    const m = obj.material as THREE.MeshStandardMaterial;
    if (m.transparent) m.opacity = opacity;
    if (m.emissive && m.emissive.getHex() !== 0) m.emissiveIntensity = t * 3.5;
  });
}

// ─── Shared material configs (MeshStandardMaterial — fast compile) ─────────────
const S = {
  chassis:   { color: "#23262f", metalness: 0.88, roughness: 0.28 },
  chassisDk: { color: "#15171e", metalness: 0.78, roughness: 0.40 },
  lid:       { color: "#272b38", metalness: 0.90, roughness: 0.24 },
  pcb:       { color: "#0e3a22", metalness: 0.04, roughness: 0.72 },
  pcbBlue:   { color: "#10293e", metalness: 0.04, roughness: 0.68 },
  aluminium: { color: "#aab4c2", metalness: 0.92, roughness: 0.16 },
  aluDark:   { color: "#8893a3", metalness: 0.88, roughness: 0.22 },
  chip:      { color: "#15181f", metalness: 0.38, roughness: 0.52 },
  chipMatte: { color: "#0c0e13", metalness: 0.22, roughness: 0.72 },
  gold:      { color: "#d4a92a", metalness: 0.96, roughness: 0.20 },
  ramSpread: { color: "#414857", metalness: 0.84, roughness: 0.26 },
  steel:     { color: "#1a1d25", metalness: 0.84, roughness: 0.26 },
  copper:    { color: "#c8821e", metalness: 0.68, roughness: 0.42,
               emissive: new THREE.Color("#7a4d10"), emissiveIntensity: 0 },
};
const led = (hex: string) => ({
  color: hex,
  emissive: new THREE.Color(hex),
  emissiveIntensity: 0,
  metalness: 0,
  roughness: 0.4,
});

// ─── Rounded box helper (smoothness=2 for perf) ───────────────────────────────
const RB: React.FC<{
  size: [number, number, number];
  pos?: [number, number, number];
  rot?: [number, number, number];
  r?: number;
  mat: Record<string, unknown>;
}> = ({ size, pos, rot, r = 0.013, mat }) => {
  const radius = Math.min(r, Math.min(...size) / 2.2);
  return (
    <RoundedBox
      args={size}
      radius={radius}
      smoothness={2}
      position={pos}
      rotation={rot}
    >
      <meshStandardMaterial transparent opacity={0} {...mat} />
    </RoundedBox>
  );
};

// ─── Soft shadow (canvas texture — zero runtime cost) ─────────────────────────
const SoftShadow: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 64, 4, 128, 64, 115);
    g.addColorStop(0,   "rgba(0,0,0,0.75)");
    g.addColorStop(0.5, "rgba(0,0,0,0.25)");
    g.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = clamp01(pr.current * 3) * 0.55;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.23, 0]}>
      <planeGeometry args={[6.5, 3.2]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
};

// ─── LED glow PointLight (simulates bloom without post-processing) ─────────────
const LEDLight: React.FC<{
  pr: React.MutableRefObject<number>;
  segStart: number;
  pos: [number, number, number];
  color: string;
}> = ({ pr, segStart, pos, color }) => {
  const ref = useRef<THREE.PointLight>(null);
  const glow = useRef(0);
  const prev = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const curr = seg(pr.current, segStart, segStart + 0.02);
    if (curr > 0.1 && prev.current < 0.1) glow.current = 1.0;
    prev.current = curr;
    glow.current = Math.max(0, glow.current - delta * 1.8);
    ref.current.intensity = glow.current * 4.5 + (curr > 0.5 ? 0.4 : 0);
  });
  return <pointLight ref={ref} position={pos} color={color} intensity={0} distance={2.5} />;
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
      <RB size={[4.2, 0.44, 1.8]}    r={0.04}  mat={S.chassis} />
      <RB size={[3.95, 0.22, 1.6]}   r={0.02}  mat={S.chassisDk} pos={[0, 0.13, 0]} />
      <RB size={[4.2, 0.44, 0.04]}   r={0.03}  mat={S.chassisDk} pos={[0, 0, -0.9]} />
      {[0.5,0.7,0.9,1.1,1.3,1.5,1.7].map((x) => (
        <RB key={x} size={[0.05,0.28,0.01]} r={0.004} mat={{ color:"#070910", metalness:0.3, roughness:0.8 }} pos={[x,0,-0.922]} />
      ))}
      {[-0.13,0,0.13].map((y) => (
        <RB key={y} size={[1.4,0.1,0.02]} r={0.01} mat={{ color:"#0c0e15", metalness:0.5, roughness:0.5 }} pos={[-0.78,y,-0.922]} />
      ))}
      <RB size={[0.1,0.045,0.012]}   r={0.006} mat={led("#33ff66")} pos={[-1.9, 0.05,-0.922]} />
      <RB size={[0.07,0.035,0.012]}  r={0.005} mat={led("#4ab8ff")} pos={[-1.74,0.05,-0.922]} />
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
      <RB size={[3.8,0.05,1.55]}   r={0.02} mat={S.pcb} />
      <RB size={[0.78,0.02,0.78]}  r={0.01} mat={{ color:"#0a0c10", metalness:0.6, roughness:0.4 }} pos={[-0.45,0.035,0.05]} />
      <RB size={[0.68,0.012,0.68]} r={0.008} mat={{ color:"#1a1e26", metalness:0.7, roughness:0.35 }} pos={[-0.45,0.04,0.05]} />
      {[[-1.2,0.0,0.6],[0.25,0.3,0.5],[0.9,-0.3,0.7],[1.4,0.2,0.4],[-0.5,-0.5,0.55]].map(([x,z,w],i) => (
        <RB key={i} size={[w as number,0.004,0.006]} r={0.002} mat={S.copper} pos={[x,0.03,z]} />
      ))}
      <RB size={[0.5,0.12,0.18]}  r={0.01} mat={S.aluDark} pos={[-0.9,0.07,0]} />
      <RB size={[0.26,0.06,0.26]} r={0.01} mat={S.aluminium} pos={[0.52,0.05,0.28]} />
      <RB size={[0.88,0.04,0.12]} r={0.008} mat={{ color:"#181b22", metalness:0.5, roughness:0.4 }} pos={[-1.04,0.04,-0.16]} />
      <RB size={[0.26,0.1,0.15]}  r={0.01} mat={S.chip} pos={[1.62,0.075,0.33]} />
      {[-0.06,0.06].map((z) => (
        <RB key={z} size={[0.16,0.05,0.07]} r={0.006} mat={{ color:"#1c2a4a", metalness:0.4, roughness:0.5 }} pos={[1.6,0.05,-0.4+z]} />
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
    g.current.rotation.y = lerp(0.5, 0, t);
    applyT(g.current, t);
  });
  return (
    <group ref={g} position={[-0.45, 2.4, 0.05]}>
      <RB size={[0.68,0.018,0.68]} r={0.006} mat={S.pcb} pos={[0,-0.026,0]} />
      {/* IHS — only MeshPhysicalMaterial in the scene, clearcoat worth it here */}
      <RoundedBox args={[0.6,0.07,0.6]} radius={0.025} smoothness={2}>
        <meshPhysicalMaterial color="#cdd2dc" metalness={0.97} roughness={0.05} clearcoat={0.65} clearcoatRoughness={0.06} transparent opacity={0} />
      </RoundedBox>
      <RB size={[0.36,0.002,0.1]} r={0.001} mat={{ color:"#9aa0ac", metalness:0.6, roughness:0.5 }} pos={[0,0.038,0.06]} />
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
      <RB size={[0.62,0.04,0.62]} r={0.01} mat={S.aluminium} pos={[0,-0.02,0]} />
      {Array.from({ length: 10 }).map((_, i) => (
        <RB key={i} size={[0.6-i*0.006,0.018,0.6-i*0.006]} r={0.004}
          mat={i%2===0 ? S.aluminium : S.aluDark} pos={[0,0.02+i*0.036,0]} />
      ))}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.07, 24]} />
        <meshStandardMaterial color="#1a1d28" metalness={0.6} roughness={0.4} transparent opacity={0} />
      </mesh>
      <group ref={fan} position={[0, 0.43, 0]}>
        {[0,60,120,180,240,300].map((deg) => (
          <mesh key={deg} rotation={[0,(deg*Math.PI)/180,0.3]} position={[0.12,0,0]}>
            <boxGeometry args={[0.13,0.02,0.08]} />
            <meshStandardMaterial color="#2c3240" metalness={0.5} roughness={0.45} transparent opacity={0} />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.055,0.055,0.05,14]} />
          <meshStandardMaterial color="#16181f" metalness={0.6} roughness={0.4} transparent opacity={0} />
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
      <RB size={[0.1,0.3,1.0]}    r={0.01}  mat={S.pcbBlue} />
      {[-1,1].map((d) => (
        <RB key={d} size={[0.018,0.3,0.96]} r={0.006} mat={S.ramSpread} pos={[d*0.06,0.02,0]} />
      ))}
      {[-0.4,-0.2,0,0.2,0.4].map((z) => (
        <RB key={z} size={[0.14,0.04,0.04]} r={0.004} mat={S.aluDark} pos={[0,0.18,z]} />
      ))}
      <RB size={[0.1,0.026,0.9]} r={0.004} mat={S.gold} pos={[0,-0.173,0]} />
    </group>
  );
};

// ─── NVME ─────────────────────────────────────────────────────────────────────
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
      <RB size={[0.88,0.035,0.22]}  r={0.008} mat={S.pcb} />
      <RB size={[0.2,0.03,0.16]}    r={0.005} mat={S.chip}     pos={[-0.12,0.03,0]} />
      {[0.17,0.36].map((xo) => (
        <RB key={xo} size={[0.14,0.026,0.18]} r={0.004} mat={S.chipMatte} pos={[xo,0.03,0]} />
      ))}
      <RB size={[0.08,0.026,0.18]}  r={0.003} mat={S.gold} pos={[-0.385,-0.002,0]} />
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
      <RB size={[0.76,0.05,0.46]}    r={0.01}  mat={S.pcb} />
      <RB size={[0.04,0.2,0.46]}     r={0.006} mat={S.aluminium} pos={[-0.39,-0.04,0]} />
      {[-0.1,0.1].map((z) => (
        <RB key={z} size={[0.03,0.11,0.14]} r={0.005}
          mat={{ color:"#1a1d24", metalness:0.5, roughness:0.5 }} pos={[-0.4,0.05,z]} />
      ))}
      {[-0.1,0.1].map((z) => (
        <RB key={z} size={[0.012,0.024,0.045]} r={0.003} mat={led("#33ff66")} pos={[-0.41,0.13,z]} />
      ))}
      <RB size={[0.16,0.06,0.14]} r={0.006} mat={S.aluDark} pos={[0.08,0.055,0]} />
      <RB size={[0.14,0.03,0.12]} r={0.005} mat={S.chip}    pos={[0.3,0.045,0]} />
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
      <RB size={[0.88,0.32,0.52]} r={0.02} mat={S.steel} />
      <mesh position={[0,0,-0.27]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[0.13,0.012,6,24]} />
        <meshStandardMaterial color="#0a0c10" metalness={0.6} roughness={0.4} transparent opacity={0} />
      </mesh>
      <group ref={fan} position={[0,0,-0.255]}>
        {[0,51,102,153,204,255,306].map((deg) => (
          <mesh key={deg} rotation={[Math.PI/2,0,(deg*Math.PI)/180]} position={[0,0.06,0]}>
            <boxGeometry args={[0.05,0.005,0.09]} />
            <meshStandardMaterial color="#181b22" metalness={0.4} roughness={0.5} transparent opacity={0} />
          </mesh>
        ))}
      </group>
      <RB size={[0.05,0.28,0.44]} r={0.01} mat={{ color:"#202430", metalness:0.5, roughness:0.5 }} pos={[0.45,0,0]} />
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
      <RB size={[4.2,0.06,1.8]}  r={0.03} mat={S.lid} />
      {[-1.2,-0.8,-0.4,0,0.4,0.8].map((x) => (
        <RB key={x} size={[0.1,0.062,1.5]} r={0.008} mat={S.chassisDk} pos={[x,-0.001,0]} />
      ))}
      <RB size={[0.9,0.064,0.18]} r={0.006}
        mat={{ color:"#33373f", metalness:0.9, roughness:0.2 }} pos={[1.5,0.001,0.6]} />
    </group>
  );
};

// ─── CAMERA ───────────────────────────────────────────────────────────────────
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
    camY.current   += (lerp(2.4, 1.05, p) - camY.current) * 0.04;
    camera.position.x = Math.sin(angle.current) * radius.current;
    camera.position.z = Math.cos(angle.current) * radius.current;
    camera.position.y = camY.current;
    camera.lookAt(0, 0.3, 0);
  });
  return null;
};

// ─── GROUND GRID ──────────────────────────────────────────────────────────────
const GroundGrid: React.FC<{ pr: React.MutableRefObject<number> }> = ({ pr }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = pr.current * 0.12;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, 0]}>
      <planeGeometry args={[16, 9, 26, 14]} />
      <meshBasicMaterial color="#3a5ba8" wireframe transparent opacity={0} depthWrite={false} />
    </mesh>
  );
};

// ─── CANVAS ───────────────────────────────────────────────────────────────────
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
      dpr={[0.9, 1.4]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
      }}
      frameloop="always"
    >
      <Environment preset="studio" environmentIntensity={0.72} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 10, 5]}  intensity={1.9} color="#fff6ec" />
      <directionalLight position={[-5, 4, -4]} intensity={0.65} color="#5e8cff" />
      <spotLight position={[0, 7, -3]} angle={0.5} penumbra={0.9} intensity={1.1} color="#aaccff" />

      {/* LED glow lights — simulate bloom without post-processing */}
      <LEDLight pr={progressRef} segStart={0.00} pos={[ 0,    0.6,  0]}    color="#bfe4ff" />
      <LEDLight pr={progressRef} segStart={0.18} pos={[-0.45, 1.0,  0.05]} color="#ffe2b0" />
      <LEDLight pr={progressRef} segStart={0.33} pos={[ 0.55, 1.0, -0.42]} color="#4ab8ff" />
      <LEDLight pr={progressRef} segStart={0.51} pos={[ 1.05, 0.8,  0.4]}  color="#b0ffe0" />
      <LEDLight pr={progressRef} segStart={0.63} pos={[-1.0,  1.0, -0.1]}  color="#7affc0" />
      <LEDLight pr={progressRef} segStart={0.73} pos={[-1.5,  0.8,  0.5]}  color="#ffbb55" />

      <SoftShadow pr={progressRef} />
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
    </Canvas>
  );
};

export default ServerScene;
