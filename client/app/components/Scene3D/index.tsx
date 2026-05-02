/**
 * Scene3D — Background canvas only.
 * Renders: floating code glyphs only. No particle dots.
 * Camera is fixed at [0, 0, 5].
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GlyphField } from "./GlyphField";

export function Scene3D() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
      dpr={[1, 1.5]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <GlyphField />
      </Suspense>
    </Canvas>
  );
}
