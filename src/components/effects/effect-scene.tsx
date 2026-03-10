import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Group, Vector2 } from "three";
import { AsciiEffect } from "./ascii-effect";

function TerminalIconModel() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x += delta * 0.06;
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Outer frame */}
      <mesh position={[-0.85, 0, 0]}>
        <boxGeometry args={[0.28, 1.95, 0.28]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.85, 0, 0]}>
        <boxGeometry args={[0.28, 1.95, 0.28]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.95, 0.28, 0.28]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[1.95, 0.28, 0.28]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Prompt glyph */}
      <mesh position={[-0.2, 0.15, 0.14]} rotation={[0, 0, -0.68]}>
        <boxGeometry args={[0.68, 0.15, 0.22]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[-0.2, -0.2, 0.14]} rotation={[0, 0, 0.68]}>
        <boxGeometry args={[0.68, 0.15, 0.22]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.5, -0.45, 0.14]}>
        <boxGeometry args={[0.55, 0.15, 0.22]} />
        <meshStandardMaterial color="#f7f3ff" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function EffectScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState(new Vector2(0, 0));
  const [resolution, setResolution] = useState(new Vector2(1920, 1080));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = rect.height - (event.clientY - rect.top);
      setMousePos(new Vector2(x, y));
    };

    const updateResolution = () => {
      const rect = container.getBoundingClientRect();
      setResolution(new Vector2(rect.width, rect.height));
    };

    container.addEventListener("mousemove", handleMouseMove);
    updateResolution();
    window.addEventListener("resize", updateResolution);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateResolution);
    };
  }, []);

  return (
    <div ref={containerRef} className="ascii-effect-preview" aria-hidden>
      <Canvas camera={{ position: [0, 0, 4.6], fov: 45 }}>
        <color attach="background" args={["#5c5c5c"]} />

        <hemisphereLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 3, -5]} intensity={1.2} />

        <TerminalIconModel />

        <OrbitControls enableDamping enableZoom={false} />

        <EffectComposer>
          <AsciiEffect
            style="standard"
            cellSize={2.2}
            invert={false}
            color
            resolution={resolution}
            mousePos={mousePos}
            postfx={{
              scanlineIntensity: 0.02,
              scanlineCount: 220,
              targetFPS: 0,
              jitterIntensity: 0,
              jitterSpeed: 1,
              mouseGlowEnabled: false,
              mouseGlowRadius: 200,
              mouseGlowIntensity: 1.5,
              vignetteIntensity: 0.06,
              vignetteRadius: 1.2,
              colorPalette: "original",
              curvature: 0.01,
              aberrationStrength: 0,
              noiseIntensity: 0,
              noiseScale: 1,
              noiseSpeed: 1,
              waveAmplitude: 0,
              waveFrequency: 10,
              waveSpeed: 1,
              glitchIntensity: 0,
              glitchFrequency: 0,
              brightnessAdjust: 0.02,
              contrastAdjust: 1.06,
            }}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
