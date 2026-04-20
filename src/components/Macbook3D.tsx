import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Html,
  ContactShadows,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { BrowserScreen } from "./BrowserScreen";
import { SectionId } from "@/lib/portfolio";

interface MacbookProps {
  /** 0 = closed, 1 = fully open. Drives the lid rotation. */
  openAmount: number;
  activeSection: SectionId;
}

/**
 * MacbookModel — a procedural highly-detailed MacBook "Neo" Mockup.
 * Fixed Geometry: Uses safe corner radiuses to prevent geometry bloating.
 */
function MacbookModel({ openAmount, activeSection }: MacbookProps) {
  const lidRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Map openAmount (0..1) -> lid rotation.
  useFrame((state) => {
    if (!lidRef.current || !groupRef.current) return;
    const start = -Math.PI * -0.44; // half-closed
    const end = -Math.PI * 0.05; // open
    const target = THREE.MathUtils.lerp(start, end, openAmount);
    lidRef.current.rotation.x = THREE.MathUtils.lerp(
      lidRef.current.rotation.x,
      target,
      0.12,
    );

    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.03 - 0.75;

    const mx = state.mouse.x;
    const my = state.mouse.y;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mx * 0.2,
      0.05,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -my * 0.05,
      0.05,
    );
  });

  // Materials
  const neoGreen = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c2c96d",
        metalness: 0.15,
        roughness: 0.4,
      }),
    [],
  );
  const neoGreenScoop = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b0ae51",
        metalness: 0.15,
        roughness: 0.4,
      }),
    [],
  );
  const neoGreenKey = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b8afac",
        metalness: 0.1,
        roughness: 0.5,
      }),
    [],
  );
  const hingeBlack = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#161616",
        metalness: 0.8,
        roughness: 0.5,
      }),
    [],
  );
  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 1,
        roughness: 0.05,
      }),
    [],
  );
  const wellGreen = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ccda6a",
        metalness: 0.15,
        roughness: 0.5,
      }),
    [],
  ); // Slightly darker

  // Proportions
  const baseW = 3.6;
  const baseD = 2.4;
  const baseH = 0.1;
  const lidThickness = 0.05;
  const safeRadius = 0.02; // Safe maximum radius to prevent geometry bloating

  // Keyboard array generator
  const keys = useMemo(() => {
    const list = [];
    const kbW = baseW * 0.84;
    const kbD = baseD * 0.45;
    const rows = 6;
    const cols = 15;
    const gap = 0.025;
    const kw = (kbW - gap * (cols - 1)) / cols;
    const kd = (kbD - gap * (rows - 1)) / rows;

    const startX = -kbW / 2 + kw / 2;
    const startZ = -kbD / 2 + kd / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Spacebar logic
        if (r === rows - 1) {
          if (c > 3 && c < 11) {
            if (c === 4) {
              const spaceW = kw * 7 + gap * 6;
              list.push({
                pos: [
                  startX + c * (kw + gap) + (spaceW / 2 - kw / 2),
                  0.005,
                  startZ + r * (kd + gap),
                ],
                args: [spaceW, 0.015, kd],
              });
            }
            continue;
          }
        }

        // F keys
        const isF = r === 0;
        const actualKd = isF ? kd * 0.6 : kd;
        const offsetZ = isF ? -kd * 0.2 : 0;
        list.push({
          pos: [
            startX + c * (kw + gap),
            0.005,
            startZ + r * (kd + gap) + offsetZ,
          ],
          args: [kw, 0.015, actualKd],
        });
      }
    }
    return list;
  }, [baseW, baseD]);

  // Trapezoid Scoop Geometry
  const scoopGeometry = useMemo(() => {
    const w = baseW * 0.16;
    const h = baseH * 0.25;
    const depth = 0.00015;
    const taper = 0.015;
    const r = 0.01; // corner radius

    const shape = new THREE.Shape();
    // Top edge
    shape.moveTo(-w / 2 + r, h / 2);
    shape.lineTo(w / 2 - r, h / 2);
    // Right edge
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - taper * 0.2, h / 2 - r);
    shape.lineTo(w / 1.95 - taper + taper * 0.2, -h / 2 + r);
    shape.quadraticCurveTo(w / 2 - taper, -h / 2, w / 2 - taper - r, -h / 2);
    // Bottom edge
    shape.lineTo(-w / 2 + taper + r, -h / 2);
    // Left edge
    shape.quadraticCurveTo(
      -w / 2 + taper,
      -h / 2,
      -w / 1.95 + taper - taper * 0.2,
      -h / 2 + r,
    );
    shape.lineTo(-w / 2 + taper * 0.2, h / 2 - r);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2 + r, h / 2);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 1,
    });
  }, [baseW, baseH]);

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Base Chassis */}
      <RoundedBox
        castShadow
        receiveShadow
        args={[baseW, baseH, baseD]}
        radius={0.04}
        smoothness={4}
        material={neoGreen}
        position={[0, 0, 0]}
      />

      {/* Thumb scoop at the front lip - Trapezoidal recessed effect */}
      <mesh
        geometry={scoopGeometry}
        material={neoGreenScoop}
        position={[0, baseH / 6 - baseH * 0.1, baseD / 2 - 0.005]}
        rotation={[0, 0, 0]}
      />

      {/* Keyboard Well - flush with chassis to avoid floating */}
      <mesh material={wellGreen} position={[0, baseH / 2 + 0.001, -0.1]}>
        <boxGeometry args={[baseW * 0.85, 0.002, baseD * 0.46]} />
      </mesh>

      {/* Individual Keys */}
      <group position={[0, baseH / 2 + 0.001, -0.1]}>
        {keys.map((k, i) => (
          <mesh
            key={i}
            position={k.pos as [number, number, number]}
            material={neoGreenKey}
          >
            <boxGeometry args={k.args as [number, number, number]} />
          </mesh>
        ))}
      </group>

      {/* Trackpad - extremely thin to avoid floating blob effect */}
      <mesh
        material={wellGreen}
        position={[0, baseH / 2 + 0.001, baseD * 0.32]}
      >
        <boxGeometry args={[baseW * 0.35, 0.002, baseD * 0.3]} />
      </mesh>

      {/* Hinge Mechanism */}
      <mesh
        material={hingeBlack}
        position={[0, baseH / 2, -baseD / 2]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.04, 0.04, baseW * 0.75, 16]} />
      </mesh>

      {/* Lid */}
      <group ref={lidRef} position={[0, baseH / 2, -baseD / 2]}>
        {/* Lid Back Shell */}
        <RoundedBox
          castShadow
          material={neoGreen}
          args={[baseW, lidThickness, baseD]}
          radius={0.02}
          smoothness={4}
          position={[0, baseD / 2, -lidThickness / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Lid Inner Bezel */}
        <RoundedBox
          material={glass}
          args={[baseW * 0.96, lidThickness * 1, baseD * 0.96]}
          radius={0.02}
          smoothness={4}
          position={[0, baseD / 2, 0.001]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Browser Screen */}
        <Html
          transform
          occlude={false}
          position={[0, baseD / 2, 0.01]}
          distanceFactor={1.2}
          style={{ pointerEvents: openAmount > 0.7 ? "auto" : "none" }}
        >
          <div
            style={{
              width: "1080px",
              height: "720px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #000",
              background: "#000",
            }}
            className="browser-shadow"
          >
            <BrowserScreen active={activeSection} />
          </div>
        </Html>
      </group>
    </group>
  );
}

interface CanvasProps {
  openAmount: number;
  activeSection: SectionId;
}

export function MacbookCanvas({ openAmount, activeSection }: CanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 5.0], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.4}
        color="#e8d8b8"
      />

      <MacbookModel openAmount={openAmount} activeSection={activeSection} />

      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.5}
        scale={8}
        blur={2}
        far={3}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
