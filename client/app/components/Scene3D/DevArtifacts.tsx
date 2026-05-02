import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/** Auto-normalize a GLB scene so the longest axis = targetSize world units */
function useNormalizedScale(scene: THREE.Group, targetSize: number) {
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? targetSize / maxDim : 1;
  }, [scene, targetSize]);
}

/** Apply a flat grayscale MeshStandardMaterial to every mesh in a scene */
function applyGrayscale(scene: THREE.Group) {
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        color: "#888888",
        metalness: 0.35,
        roughness: 0.65,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });
}

// ─── Floating code glyphs ─────────────────────────────────────────────────────
function CodeGlyph({
  text,
  position,
  speed,
  rotSpeed,
}: {
  text: string;
  position: [number, number, number];
  speed: number;
  rotSpeed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y =
      position[1] + Math.sin(t * speed + position[0]) * 0.3;
    ref.current.rotation.z = Math.sin(t * rotSpeed) * 0.1;
    // No rotation.y — keep text always facing camera to prevent mirroring
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.19}
        color="#555555"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        depthOffset={-1}
        fillOpacity={0.2}
        material-depthWrite={false}
      >
        {text}
      </Text>
    </group>
  );
}

// ─── GLB model components (all with grayscale override) ───────────────────────
function GamingKeyboard({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/gaming_keyboard.glb");
  const scale = useNormalizedScale(scene, 2.5);

  useMemo(() => applyGrayscale(scene), [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.55 + 1) * 0.18;
    ref.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

function ComputerMouse({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/simple_computer_mouse.glb");
  const scale = useNormalizedScale(scene, 1.2);

  useMemo(() => applyGrayscale(scene), [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + 2) * 0.15;
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

function Motorcycle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(
    "/models/motorcycle_-_custom_bike_jawa_low-poly.glb",
  );
  const scale = useNormalizedScale(scene, 3.5);

  useMemo(() => applyGrayscale(scene), [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + 3) * 0.2;
    ref.current.rotation.y = t * 0.06;
  });

  return (
    <group ref={ref} position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

function Supercar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/fictional_supercar_-_v12_goblin.glb");
  const scale = useNormalizedScale(scene, 3.0);

  useMemo(() => applyGrayscale(scene), [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.45 + 0.5) * 0.22;
    ref.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={ref} position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

// ─── DevArtifacts — full Act 4 scene ─────────────────────────────────────────
export function DevArtifacts() {
  const glyphs: {
    text: string;
    pos: [number, number, number];
    speed: number;
    rot: number;
  }[] = [
    { text: "{ }", pos: [-4, 1.5, -4], speed: 0.8, rot: 0.5 },
    { text: "</>", pos: [5, 2.0, -6], speed: 0.6, rot: 0.4 },
    { text: "//", pos: [-5, -1.0, -8], speed: 0.9, rot: 0.6 },
    { text: "> _", pos: [4, -1.5, -10], speed: 0.7, rot: 0.3 },
    { text: "=> {}", pos: [6, 2.0, -12], speed: 0.85, rot: 0.45 },
    { text: "import", pos: [-6, 2.5, -14], speed: 0.65, rot: 0.35 },
    { text: "async", pos: [3, -2.0, -16], speed: 0.75, rot: 0.55 },
    { text: "null", pos: [7, 1.0, -9], speed: 0.9, rot: 0.65 },
    { text: "0x1A", pos: [-5, -2.0, -13], speed: 0.6, rot: 0.4 },
    { text: "( )", pos: [-3, 3.0, -18], speed: 0.5, rot: 0.7 },
  ];

  return (
    <group>
      {glyphs.map((g, i) => (
        <CodeGlyph
          key={i}
          text={g.text}
          position={g.pos}
          speed={g.speed}
          rotSpeed={g.rot}
        />
      ))}

      <GamingKeyboard position={[-4, -1, -6]} />
      <ComputerMouse position={[3, -0.5, -2]} />
      <Supercar position={[4, -1, -20]} />
      <Motorcycle position={[5, -2, -33]} />
    </group>
  );
}

useGLTF.preload("/models/gaming_keyboard.glb");
useGLTF.preload("/models/simple_computer_mouse.glb");
useGLTF.preload("/models/fictional_supercar_-_v12_goblin.glb");
useGLTF.preload("/models/motorcycle_-_custom_bike_jawa_low-poly.glb");
