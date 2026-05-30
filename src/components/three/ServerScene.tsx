import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export interface ServerSceneProps {
  progress: number;
}

// ─── easing ──────────────────────────────────────────────────────────────────
function clamp01(t: number) { return Math.max(0, Math.min(1, t)); }
function seg(p: number, a: number, b: number) { return clamp01((p - a) / (b - a)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

/** slight overshoot → satisfying landing feel */
function eob(t: number) {
  const c1 = 1.08, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function ft(p: number, a: number, b: number) { return eob(seg(p, a, b)); }
function op(t: number) { return Math.min(1, t * 5); }

// ─── CHASSIS ─────────────────────────────────────────────────────────────────
const Chassis: React.FC<{ t: number }> = ({ t }) => {
  const y = lerp(-2.8, 0, t);
  const o = op(t);
  return (
    <group position={[0, y, 0]}>
      {/* main body */}
      <mesh castShadow>
        <boxGeometry args={[4.2, 0.44, 1.8]} />
        <meshPhysicalMaterial color="#1c1f28" metalness={0.88} roughness={0.2} transparent opacity={o} />
      </mesh>
      {/* top edge highlight */}
      <mesh position={[0, 0.225, 0]}>
        <boxGeometry args={[4.2, 0.008, 1.8]} />
        <meshPhysicalMaterial color="#2e3248" metalness={0.7} roughness={0.35} transparent opacity={o * 0.8} />
      </mesh>
      {/* front bezel */}
      <mesh position={[0, 0, -0.905]}>
        <boxGeometry args={[4.2, 0.44, 0.01]} />
        <meshPhysicalMaterial color="#14161f" metalness={0.72} roughness={0.42} transparent opacity={o} />
      </mesh>
      {/* ventilation slots */}
      {[0.55, 0.75, 0.95, 1.15, 1.35, 1.55].map((x) => (
        <mesh key={x} position={[x, 0, -0.912]}>
          <boxGeometry args={[0.07, 0.28, 0.001]} />
          <meshPhysicalMaterial color="#090b11" transparent opacity={o} />
        </mesh>
      ))}
      {/* power LED — green */}
      <mesh position={[-1.88, 0.04, -0.912]}>
        <boxGeometry args={[0.09, 0.04, 0.003]} />
        <meshPhysicalMaterial color="#22dd55" emissive="#22dd55" emissiveIntensity={t * 3.5} transparent opacity={o} />
      </mesh>
      {/* activity LED — blue */}
      <mesh position={[-1.73, 0.04, -0.912]}>
        <boxGeometry args={[0.06, 0.03, 0.003]} />
        <meshPhysicalMaterial color="#44aaff" emissive="#44aaff" emissiveIntensity={t * 2.5} transparent opacity={o} />
      </mesh>
      {/* HDD cage horizontal bars */}
      {[-0.12, 0, 0.12].map((yo) => (
        <mesh key={yo} position={[-0.85, yo, -0.912]}>
          <boxGeometry args={[1.2, 0.014, 0.002]} />
          <meshPhysicalMaterial color="#0a0c12" transparent opacity={o * 0.7} />
        </mesh>
      ))}
    </group>
  );
};

// ─── MOTHERBOARD ─────────────────────────────────────────────────────────────
const Motherboard: React.FC<{ t: number }> = ({ t }) => {
  const y = lerp(2.0, 0.24, t);
  const o = op(t);
  return (
    <group position={[0, y, 0]}>
      {/* PCB substrate */}
      <mesh>
        <boxGeometry args={[3.8, 0.055, 1.55]} />
        <meshPhysicalMaterial color="#0d2618" metalness={0.1} roughness={0.84} transparent opacity={o} />
      </mesh>
      {/* CPU socket LGA area */}
      <mesh position={[-0.45, 0.03, 0.05]}>
        <boxGeometry args={[0.74, 0.008, 0.74]} />
        <meshPhysicalMaterial color="#112a1c" metalness={0.2} roughness={0.7} transparent opacity={o} />
      </mesh>
      {/* copper trace lines (subtle emissive) */}
      {[
        [-1.2, 0.0],
        [0.2, 0.28],
        [0.9, -0.3],
        [1.5, 0.2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.03, z]}>
          <boxGeometry args={[0.5, 0.002, 0.003]} />
          <meshPhysicalMaterial
            color="#c89010"
            emissive="#c89010"
            emissiveIntensity={0.2}
            transparent
            opacity={o * 0.45}
          />
        </mesh>
      ))}
      {/* south-bridge chipset */}
      <mesh position={[0.52, 0.045, 0.28]}>
        <boxGeometry args={[0.24, 0.02, 0.24]} />
        <meshPhysicalMaterial color="#111418" metalness={0.38} roughness={0.55} transparent opacity={o} />
      </mesh>
      {/* VRM MOSFETs near CPU */}
      {[-0.1, 0.0, 0.1].map((zo) => (
        <mesh key={zo} position={[-0.88, 0.04, zo]}>
          <boxGeometry args={[0.07, 0.045, 0.06]} />
          <meshPhysicalMaterial color="#1a1a22" metalness={0.5} roughness={0.48} transparent opacity={o} />
        </mesh>
      ))}
      {/* PCIe x16 slot */}
      <mesh position={[-1.04, 0.04, -0.14]}>
        <boxGeometry args={[0.86, 0.014, 0.11]} />
        <meshPhysicalMaterial color="#1a1a22" metalness={0.45} roughness={0.44} transparent opacity={o} />
      </mesh>
      {/* 24-pin ATX power connector */}
      <mesh position={[1.62, 0.07, 0.33]}>
        <boxGeometry args={[0.24, 0.08, 0.14]} />
        <meshPhysicalMaterial color="#181818" metalness={0.3} roughness={0.7} transparent opacity={o} />
      </mesh>
    </group>
  );
};

// ─── CPU ─────────────────────────────────────────────────────────────────────
const CPU: React.FC<{ t: number }> = ({ t }) => {
  const y = lerp(2.4, 0.355, t);
  const o = op(t);
  return (
    <group position={[-0.45, y, 0.05]}>
      {/* PCB substrate border */}
      <mesh position={[0, -0.025, 0]}>
        <boxGeometry args={[0.68, 0.01, 0.68]} />
        <meshPhysicalMaterial color="#182814" metalness={0.1} roughness={0.9} transparent opacity={o} />
      </mesh>
      {/* IHS — polished aluminium */}
      <mesh>
        <boxGeometry args={[0.62, 0.07, 0.62]} />
        <meshPhysicalMaterial
          color="#c4c8d2"
          metalness={0.96}
          roughness={0.06}
          clearcoat={0.5}
          clearcoatRoughness={0.08}
          transparent
          opacity={o}
        />
      </mesh>
      {/* laser-mark band */}
      <mesh position={[0, 0.037, 0.05]}>
        <boxGeometry args={[0.38, 0.001, 0.09]} />
        <meshPhysicalMaterial color="#aab0bc" metalness={0.5} roughness={0.8} transparent opacity={o * 0.35} />
      </mesh>
    </group>
  );
};

// ─── CPU COOLER ──────────────────────────────────────────────────────────────
const CPUCooler: React.FC<{ t: number; reduced: boolean }> = ({ t, reduced }) => {
  const y = lerp(2.7, 0.52, t);
  const o = op(t);
  const fanRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!fanRef.current || reduced) return;
    fanRef.current.rotation.y += delta * (2 + t * 6);
  });
  return (
    <group position={[-0.45, y, 0.05]}>
      {/* base plate */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.63, 0.04, 0.63]} />
        <meshPhysicalMaterial color="#9aaabb" metalness={0.9} roughness={0.18} transparent opacity={o} />
      </mesh>
      {/* aluminium fin stack */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[0, 0.025 + i * 0.042, 0]}>
          <boxGeometry args={[0.61 - i * 0.008, 0.024, 0.61 - i * 0.008]} />
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#a8bac8" : "#8899aa"}
            metalness={0.88}
            roughness={0.14}
            transparent
            opacity={o}
          />
        </mesh>
      ))}
      {/* fan housing ring */}
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 28]} />
        <meshPhysicalMaterial color="#1c1f2a" metalness={0.62} roughness={0.38} transparent opacity={o} />
      </mesh>
      {/* spinning blades */}
      <group ref={fanRef} position={[0, 0.41, 0]}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <mesh key={deg} rotation={[0, (deg * Math.PI) / 180, 0]} position={[0.11, 0, 0]}>
            <boxGeometry args={[0.1, 0.024, 0.072]} />
            <meshPhysicalMaterial color="#2a2f3c" metalness={0.52} roughness={0.48} transparent opacity={o} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ─── RAM STICK ───────────────────────────────────────────────────────────────
const RAMStick: React.FC<{ t: number; x: number }> = ({ t, x }) => {
  const z = lerp(-3.0, -0.42, t);
  const o = op(t);
  return (
    <group position={[x, 0.35, z]}>
      {/* PCB */}
      <mesh>
        <boxGeometry args={[0.1, 0.3, 1.0]} />
        <meshPhysicalMaterial color="#0c1e2e" metalness={0.12} roughness={0.82} transparent opacity={o} />
      </mesh>
      {/* heat spreader sides */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.058, 0.01, 0]}>
          <boxGeometry args={[0.012, 0.28, 0.96]} />
          <meshPhysicalMaterial color="#3a4050" metalness={0.82} roughness={0.22} transparent opacity={o} />
        </mesh>
      ))}
      {/* memory chips (front face) */}
      {[-0.34, -0.12, 0.12, 0.34].map((zo) => (
        <mesh key={zo} position={[0.055, 0.02, zo]}>
          <boxGeometry args={[0.016, 0.1, 0.14]} />
          <meshPhysicalMaterial color="#111318" metalness={0.32} roughness={0.6} transparent opacity={o} />
        </mesh>
      ))}
      {/* gold contacts edge */}
      <mesh position={[0, -0.173, 0]}>
        <boxGeometry args={[0.1, 0.024, 0.9]} />
        <meshPhysicalMaterial color="#c8a018" metalness={0.95} roughness={0.1} transparent opacity={o} />
      </mesh>
    </group>
  );
};

// ─── NVME SSD ────────────────────────────────────────────────────────────────
const NVMe: React.FC<{ t: number; z: number }> = ({ t, z }) => {
  const x = lerp(3.8, 1.05, t);
  const o = op(t);
  return (
    <group position={[x, 0.27, z]}>
      {/* PCB */}
      <mesh>
        <boxGeometry args={[0.88, 0.038, 0.22]} />
        <meshPhysicalMaterial color="#0a1a14" metalness={0.12} roughness={0.82} transparent opacity={o} />
      </mesh>
      {/* controller IC */}
      <mesh position={[-0.12, 0.03, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.16]} />
        <meshPhysicalMaterial color="#111418" metalness={0.38} roughness={0.55} transparent opacity={o} />
      </mesh>
      {/* NAND chips */}
      {[0.17, 0.36].map((xo) => (
        <mesh key={xo} position={[xo, 0.03, 0]}>
          <boxGeometry args={[0.14, 0.022, 0.18]} />
          <meshPhysicalMaterial color="#0e1216" metalness={0.3} roughness={0.6} transparent opacity={o} />
        </mesh>
      ))}
      {/* M.2 gold fingers */}
      <mesh position={[-0.385, -0.004, 0]}>
        <boxGeometry args={[0.08, 0.028, 0.18]} />
        <meshPhysicalMaterial color="#c8a018" metalness={0.95} roughness={0.1} transparent opacity={o} />
      </mesh>
    </group>
  );
};

// ─── NIC CARD ────────────────────────────────────────────────────────────────
const NIC: React.FC<{ t: number }> = ({ t }) => {
  const y = lerp(2.2, 0.35, t);
  const o = op(t);
  return (
    <group position={[-1.02, y, -0.1]}>
      {/* PCB */}
      <mesh>
        <boxGeometry args={[0.76, 0.065, 0.46]} />
        <meshPhysicalMaterial color="#0d2218" metalness={0.1} roughness={0.85} transparent opacity={o} />
      </mesh>
      {/* bracket */}
      <mesh position={[-0.385, -0.04, 0]}>
        <boxGeometry args={[0.03, 0.18, 0.46]} />
        <meshPhysicalMaterial color="#222830" metalness={0.78} roughness={0.28} transparent opacity={o} />
      </mesh>
      {/* RJ45 ports */}
      {[-0.1, 0.1].map((zo) => (
        <mesh key={zo} position={[-0.39, 0.05, zo]}>
          <boxGeometry args={[0.026, 0.1, 0.14]} />
          <meshPhysicalMaterial color="#1c1f26" metalness={0.35} roughness={0.65} transparent opacity={o} />
        </mesh>
      ))}
      {/* link LEDs */}
      {[-0.1, 0.1].map((zo) => (
        <mesh key={zo} position={[-0.39, 0.125, zo]}>
          <boxGeometry args={[0.008, 0.022, 0.04]} />
          <meshPhysicalMaterial
            color="#22dd55"
            emissive="#22dd55"
            emissiveIntensity={t * 3.5}
            transparent
            opacity={o}
          />
        </mesh>
      ))}
      {/* controller ICs */}
      {[0.08, 0.3].map((xo) => (
        <mesh key={xo} position={[xo, 0.052, 0]}>
          <boxGeometry args={[0.14, 0.025, 0.12]} />
          <meshPhysicalMaterial color="#111418" metalness={0.32} roughness={0.6} transparent opacity={o} />
        </mesh>
      ))}
    </group>
  );
};

// ─── PSU ─────────────────────────────────────────────────────────────────────
const PSU: React.FC<{ t: number }> = ({ t }) => {
  const x = lerp(-4.2, -1.46, t);
  const o = op(t);
  return (
    <group position={[x, 0.26, 0.52]}>
      {/* body */}
      <mesh>
        <boxGeometry args={[0.88, 0.32, 0.52]} />
        <meshPhysicalMaterial color="#111318" metalness={0.82} roughness={0.22} transparent opacity={o} />
      </mesh>
      {/* fan grill */}
      <mesh position={[0, 0, -0.265]}>
        <cylinderGeometry args={[0.13, 0.13, 0.01, 24]} />
        <meshPhysicalMaterial color="#0a0c10" metalness={0.5} roughness={0.55} transparent opacity={o} />
      </mesh>
      {[-0.07, 0, 0.07].map((d) => (
        <mesh key={d} position={[d, 0, -0.261]}>
          <boxGeometry args={[0.006, 0.24, 0.006]} />
          <meshPhysicalMaterial color="#1a1d24" transparent opacity={o} />
        </mesh>
      ))}
      {/* connector end */}
      <mesh position={[0.44, 0, 0]}>
        <boxGeometry args={[0.014, 0.28, 0.44]} />
        <meshPhysicalMaterial color="#1c2028" metalness={0.6} roughness={0.4} transparent opacity={o} />
      </mesh>
    </group>
  );
};

// ─── LID ─────────────────────────────────────────────────────────────────────
const Lid: React.FC<{ t: number }> = ({ t }) => {
  const y = lerp(3.0, 0.58, t);
  const o = op(t);
  return (
    <group position={[0, y, 0]}>
      {/* top panel */}
      <mesh>
        <boxGeometry args={[4.2, 0.07, 1.8]} />
        <meshPhysicalMaterial color="#1e2232" metalness={0.88} roughness={0.18} transparent opacity={o} />
      </mesh>
      {/* vent perforation strips */}
      {[-1.2, -0.8, -0.4, 0, 0.4, 0.8].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.11, 0.072, 1.6]} />
          <meshPhysicalMaterial color="#13151d" metalness={0.7} roughness={0.3} transparent opacity={o} />
        </mesh>
      ))}
    </group>
  );
};

// ─── CAMERA RIG ──────────────────────────────────────────────────────────────
const CameraRig: React.FC<{ progress: number; reduced: boolean }> = ({ progress, reduced }) => {
  const { camera } = useThree();
  const angle = useRef(0.35);
  useFrame((_, delta) => {
    if (reduced) return;
    angle.current += delta * 0.045;
    const r = 5.8 - progress * 0.7;
    camera.position.x = Math.sin(angle.current) * r;
    camera.position.z = Math.cos(angle.current) * r;
    camera.position.y = lerp(2.2, 1.1, progress);
    camera.lookAt(0, 0.28, 0);
  });
  return null;
};

// ─── MAIN CANVAS ─────────────────────────────────────────────────────────────
const ServerScene: React.FC<ServerSceneProps> = ({ progress }) => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const p = progress;

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [1.2, 2.2, 5.8], fov: 46 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      {/* studio IBL — transforms material quality dramatically */}
      <Environment preset="studio" environmentIntensity={0.7} />

      {/* manual lights for control */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 4]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, 3, -3]} intensity={0.55} color="#5588ff" />
      <pointLight position={[0, 3, 1.5]} intensity={1.0} color="#88aaff" distance={9} />

      <ContactShadows
        position={[0, -0.22, 0]}
        opacity={0.55}
        scale={9}
        blur={2.2}
        far={1.2}
        color="#000000"
      />

      <CameraRig progress={p} reduced={reduced} />

      {/* ── assembly sequence ── */}
      <Chassis    t={ft(p, 0.00, 0.10)} />
      <Motherboard t={ft(p, 0.08, 0.20)} />
      <CPU        t={ft(p, 0.18, 0.30)} />
      <CPUCooler  t={ft(p, 0.25, 0.37)} reduced={reduced} />
      <RAMStick   t={ft(p, 0.33, 0.45)} x={0.22} />
      <RAMStick   t={ft(p, 0.37, 0.48)} x={0.46} />
      <RAMStick   t={ft(p, 0.41, 0.51)} x={0.70} />
      <RAMStick   t={ft(p, 0.45, 0.54)} x={0.94} />
      <NVMe       t={ft(p, 0.51, 0.63)} z={0.28} />
      <NVMe       t={ft(p, 0.55, 0.66)} z={0.56} />
      <NIC        t={ft(p, 0.63, 0.75)} />
      <PSU        t={ft(p, 0.73, 0.85)} />
      <Lid        t={ft(p, 0.87, 1.00)} />
    </Canvas>
  );
};

export default ServerScene;
