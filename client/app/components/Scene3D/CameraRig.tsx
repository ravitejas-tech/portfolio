import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

interface CameraRigProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * Camera path state — GSAP will tween these values directly.
 * Positions: cam{x,y,z}, LookAt: l{x,y,z}
 */
const camState = {
  x: 0,
  y: 2,
  z: 8,
  lx: 0,
  ly: 1,
  lz: 0,
};

/**
 * Build a GSAP timeline that maps 0–1 progress to 6 camera keyframes.
 * 5 equal segments of 0.2 duration each, sum = 1.0.
 *
 * Keyframes (scroll% → cam pos → lookAt):
 *   0%  → [0,   2,   8]  → [0,    0,    0]
 *  20%  → [0,   1.5, 4]  → [-1,   0.5,  0]
 *  40%  → [0,   1,   1]  → [0,    0.8, -2]
 *  60%  → [1,   0.5,-10] → [0,    0,  -15]
 *  80%  → [-1,  1,  -22] → [0,    0.5,-28]
 * 100%  → [0,   1,  -32] → [0,    0,  -36]
 */
function buildCameraTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.set(camState, { x: 0, y: 2, z: 8, lx: 0, ly: 0, lz: 0 });

  // 0% → 20%
  tl.to(camState, {
    x: 0,
    y: 1.5,
    z: 4,
    lx: -1,
    ly: 0.5,
    lz: 0,
    ease: "power2.inOut",
    duration: 0.2,
  });
  // 20% → 40%
  tl.to(camState, {
    x: 0,
    y: 1,
    z: 1,
    lx: 0,
    ly: 0.8,
    lz: -2,
    ease: "power2.inOut",
    duration: 0.2,
  });
  // 40% → 60%
  tl.to(camState, {
    x: 1,
    y: 0.5,
    z: -10,
    lx: 0,
    ly: 0,
    lz: -15,
    ease: "power2.inOut",
    duration: 0.2,
  });
  // 60% → 80%
  tl.to(camState, {
    x: -1,
    y: 1,
    z: -22,
    lx: 0,
    ly: 0.5,
    lz: -28,
    ease: "power2.inOut",
    duration: 0.2,
  });
  // 80% → 100%
  tl.to(camState, {
    x: 0,
    y: 1,
    z: -32,
    lx: 0,
    ly: 0,
    lz: -36,
    ease: "power2.inOut",
    duration: 0.2,
  });

  return tl;
}

// Create the timeline once (module-level singleton)
const cameraTl = buildCameraTimeline();

export function CameraRig({ scrollProgress, mouse }: CameraRigProps) {
  const { camera } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const lookAtVec = useRef(new THREE.Vector3());

  useFrame(() => {
    // Scrub the GSAP timeline to the current scroll progress
    cameraTl.progress(scrollProgress);

    // Smooth mouse parallax
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    const px = smoothMouse.current.x * 0.12;
    const py = smoothMouse.current.y * 0.07;

    // Apply GSAP-interpolated camera position + parallax
    camera.position.set(camState.x + px, camState.y + py, camState.z);

    lookAtVec.current.set(
      camState.lx + px * 0.3,
      camState.ly + py * 0.3,
      camState.lz,
    );
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
