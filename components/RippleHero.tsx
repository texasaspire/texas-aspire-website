"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Hash-based value noise — cheap, reasonably even.
const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;       // 0..1, y flipped to top-left origin
  uniform vec2  uMouseEased;  // damped follow
  uniform vec2  uResolution;  // px
  uniform vec3  uPaper;       // base paper color
  uniform vec3  uInk;         // accent for shadow
  uniform float uIntensity;   // 0..1

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;

    // distance from cursor in normalized "square" space
    vec2 toMouse = uv - uMouseEased;
    toMouse.x *= aspect;
    float dist = length(toMouse);

    // expanding ripples emanating from cursor
    float ring = sin(dist * 18.0 - uTime * 2.4) * exp(-dist * 3.5);
    ring *= 0.04 * uIntensity;

    // displace UV outward by ring amplitude
    vec2 dir = toMouse / max(dist, 1e-4);
    vec2 displaced = uv + dir * ring;

    // Multi-octave fine grain (very subtle)
    float n = 0.0;
    n += 0.55 * noise(displaced * 240.0);
    n += 0.30 * noise(displaced * 480.0 + 13.7);
    n += 0.15 * noise(displaced * 960.0 - 7.1);
    n = (n - 0.5) * 0.06; // small amplitude

    // soft halo near cursor — light, then back to paper
    float halo = exp(-dist * 4.0);

    // base paper, lifted near cursor, darker at the rim of halo
    vec3 col = uPaper;
    col += vec3(n);                                 // grain
    col += halo * 0.025 * vec3(1.0);                // gentle lift in cursor halo
    col -= ring * 0.55 * vec3(0.04, 0.07, 0.05);    // ripple shading

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const eased = useRef(new THREE.Vector2(0.5, 0.5));
  const { size, viewport } = useThree();

  // listen to pointermove on window — capture even when cursor is over content
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // map cursor to canvas-local 0..1 (y flipped)
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      target.current.set(x, y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // recompute resolution uniform on resize
  useEffect(() => {
    if (!mat.current) return;
    mat.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height]);

  useFrame((_, delta) => {
    if (!mat.current) return;
    eased.current.lerp(target.current, Math.min(1, delta * 6));
    mat.current.uniforms.uMouseEased.value.copy(eased.current);
    mat.current.uniforms.uMouse.value.copy(target.current);
    mat.current.uniforms.uTime.value += delta;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseEased: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPaper: { value: new THREE.Color("#F2EFE7") },
      uInk: { value: new THREE.Color("#1B4D2E") },
      uIntensity: { value: 1.0 },
    }),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function RippleHero() {
  return (
    <div className="ta-hero__ripple" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Plane />
      </Canvas>
    </div>
  );
}
