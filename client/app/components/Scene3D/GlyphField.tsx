/**
 * GlyphField — Floating code glyphs in 3D space.
 * Low opacity (0.12–0.18) white text chars drifting slowly.
 */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const GLYPHS = [
  "const",
  "=>",
  "{}",
  "[];",
  "async",
  "await",
  "import",
  "export",
  "return",
  "type",
  "interface",
  "</>",
  "git",
  "npm",
  "tsx",
  "node",
  "fn()",
  "API",
  "...",
  "===",
  "null",
  "void",
  "true",
  "class",
  "extends",
  "?.",
  "??",
];

interface GlyphData {
  text: string;
  position: [number, number, number];
  speed: number;
  opacity: number;
  size: number;
  rotY: number;
}

export function GlyphField({ count = 18 }: { count?: number }) {
  const glyphs: GlyphData[] = useMemo(() => {
    const out: GlyphData[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        text: GLYPHS[i % GLYPHS.length],
        position: [
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8 - 2,
        ],
        speed: 0.03 + Math.random() * 0.04,
        opacity: 0.1 + Math.random() * 0.08,
        size: 0.18 + Math.random() * 0.12,
        rotY: (Math.random() - 0.5) * 0.4,
      });
    }
    return out;
  }, [count]);

  return (
    <>
      {glyphs.map((g, i) => (
        <FloatingGlyph key={i} {...g} index={i} />
      ))}
    </>
  );
}

function FloatingGlyph({
  text,
  position,
  speed,
  opacity,
  size,
  rotY,
  index,
}: GlyphData & { index: number }) {
  const ref = useRef<THREE.Group>(null);
  const spread = 14;
  const startY = position[1];

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y -= speed * delta;
    if (ref.current.position.y < -spread / 2) {
      ref.current.position.y = spread / 2;
    }
  });

  return (
    <group ref={ref} position={position} rotation={[0, rotY, 0]}>
      <Text
        fontSize={size}
        color="#ffffff"
        fillOpacity={opacity}
        font={undefined}
        anchorX="center"
        anchorY="middle"
        characters="abcdefghijklmnopqrstuvwxyz0123456789<>=/?.{}[];()!&|,"
      >
        {text}
      </Text>
    </group>
  );
}
