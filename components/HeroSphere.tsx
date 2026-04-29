"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const TURNS = 6;
const HEIGHT = 5.4;
const RADIUS = 0.62;
const STRAND_SEGMENTS = 360;
const RUNG_COUNT = 28;
const NODE_EVERY = 18;
const NODE_RADIUS = 0.03;

function helixPoint(u: number, phase: number) {
  const theta = u * TURNS * Math.PI * 2 + phase;
  const y = u * HEIGHT - HEIGHT / 2;
  return new THREE.Vector3(
    Math.cos(theta) * RADIUS,
    y,
    Math.sin(theta) * RADIUS
  );
}

function strandSegmentGeometry(phase: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < STRAND_SEGMENTS; i++) {
    const u1 = i / STRAND_SEGMENTS;
    const u2 = (i + 1) / STRAND_SEGMENTS;
    points.push(helixPoint(u1, phase));
    points.push(helixPoint(u2, phase));
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function DoubleHelix() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.7;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    current.current.x += (target.current.x - current.current.x) * 0.05;
    current.current.y += (target.current.y - current.current.y) * 0.05;

    const t = performance.now() * 0.001;

    if (group.current) {
      group.current.rotation.y = t * 0.18 + current.current.x * 0.3;
      group.current.rotation.x = current.current.y * 0.25;
      group.current.position.y = Math.sin(t * 0.4) * 0.04;
    }
  });

  const strandA = useMemo(() => strandSegmentGeometry(0), []);
  const strandB = useMemo(() => strandSegmentGeometry(Math.PI), []);

  const rungs = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < RUNG_COUNT; i++) {
      const u = (i + 0.5) / RUNG_COUNT;
      points.push(helixPoint(u, 0), helixPoint(u, Math.PI));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const nodes = useMemo(() => {
    const out: { key: string; pos: [number, number, number]; color: string }[] = [];
    for (let i = 0; i <= STRAND_SEGMENTS; i += NODE_EVERY) {
      const u = i / STRAND_SEGMENTS;
      const a = helixPoint(u, 0);
      const b = helixPoint(u, Math.PI);
      out.push({ key: `a${i}`, pos: [a.x, a.y, a.z], color: "#1B4D2E" });
      out.push({ key: `b${i}`, pos: [b.x, b.y, b.z], color: "#2A6741" });
    }
    return out;
  }, []);

  return (
    <group ref={group}>
      <lineSegments geometry={strandA}>
        <lineBasicMaterial color="#1B4D2E" transparent opacity={0.85} />
      </lineSegments>

      <lineSegments geometry={strandB}>
        <lineBasicMaterial color="#2A6741" transparent opacity={0.85} />
      </lineSegments>

      <lineSegments geometry={rungs}>
        <lineBasicMaterial color="#4A7C5F" transparent opacity={0.55} />
      </lineSegments>

      {nodes.map((n) => (
        <mesh key={n.key} position={n.pos}>
          <sphereGeometry args={[NODE_RADIUS, 12, 12]} />
          <meshBasicMaterial color={n.color} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      const wrap = wrapRef.current;
      const target = document.querySelector(".ta-about__missionwrap") as HTMLElement | null;
      if (!wrap || !target) return;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      const targetBottom = target.getBoundingClientRect().bottom + window.scrollY;
      const next = Math.max(0, targetBottom - wrapTop);
      setHeight((prev) => (prev === next ? prev : next));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    const target = document.querySelector(".ta-about__missionwrap");
    if (target) ro.observe(target);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="ta-hero__sphere"
      aria-hidden="true"
      style={height !== null ? { height: `${height}px` } : undefined}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <DoubleHelix />
      </Canvas>
    </div>
  );
}
