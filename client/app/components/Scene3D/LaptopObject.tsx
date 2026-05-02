import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function LaptopObject() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/laptop.glb");

  // Fixed scale of 2.0 regardless of model dimensions
  const laptopScale = 2.0;

  // Apply grayscale materials to all GLB meshes
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#888888",
          metalness: 0.4,
          roughness: 0.6,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  // Photo texture for the laptop screen plane
  const screenTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load("/ravi.webp");
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle breathing float
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    // Slight rotation sway
    groupRef.current.rotation.y = -0.15 + Math.sin(t * 0.28) * 0.05;
  });

  return (
    <group ref={groupRef} position={[-2.2, -0.8, 0]}>
      {/* GLB laptop model */}
      <primitive object={scene} scale={laptopScale} />

      {/* Photo on the screen — local position relative to group origin */}
      <mesh
        position={[0, 0.6, 0.18]}
        rotation={[-0.15, 0.3, 0]}
        renderOrder={1}
      >
        <planeGeometry args={[1.05, 0.65]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Screen glow */}
      <pointLight
        position={[0, 1.0, 0.9]}
        intensity={3}
        color="#aabbff"
        distance={5}
        decay={2}
      />
    </group>
  );
}

useGLTF.preload("/models/laptop.glb");
