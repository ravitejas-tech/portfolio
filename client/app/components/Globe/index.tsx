import { Canvas } from "@react-three/fiber";
import { useGLTF, Bounds, useBounds, Environment } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function AutoFit() {
  const bounds = useBounds();
  useEffect(() => {
    bounds.refresh().fit();
  }, [bounds]);
  return null;
}

function blurTexture(texture: THREE.Texture, radius = 10) {
  const img = texture.image as
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap;
  if (!img) return;
  const w = "width" in img ? img.width : 512;
  const h = "height" in img ? img.height : 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.filter = `blur(${radius}px)`;
  ctx.drawImage(img as CanvasImageSource, 0, 0, w, h);
  texture.image = canvas;
  texture.needsUpdate = true;
}

function Model() {
  const { scene } = useGLTF("/models/programmer_desktop.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const name = child.name.toLowerCase();
      const isScreen =
        name.includes("screen") ||
        name.includes("display") ||
        name.includes("monitor") ||
        name.includes("lcd");
      if (!isScreen) return;
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material];
      mats.forEach((mat: THREE.MeshStandardMaterial) => {
        if (mat?.map) blurTexture(mat.map, 12);
        if (mat?.emissiveMap) blurTexture(mat.emissiveMap, 12);
      });
    });
  }, [scene]);

  return <primitive object={scene} />;
}

export function DesktopModel({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "520px" }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <directionalLight position={[-5, 4, -5]} intensity={0.8} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={0.85}>
            <AutoFit />
            <Model />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}
