import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Html,
  ContactShadows,
  RoundedBox,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { BrowserScreen } from "./BrowserScreen";
import { SectionId } from "@/lib/portfolio";


interface MacbookProps {
  /** 0 = closed, 1 = fully open. Drives the lid rotation. */
  openAmount: number;
  activeSection: SectionId;
  storyProgress: number;
}

/**
 * MacbookModel — a procedural highly-detailed MacBook "Neo" Mockup.
 * Fixed Geometry: Uses safe corner radiuses to prevent geometry bloating.
 */
function MacbookModel({ openAmount, activeSection, storyProgress }: MacbookProps) {
  const lidRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { size } = useThree();

  // --- Responsive uniform scale ---
  // Compute the visible width of the scene at z=0, then scale the laptop
  // so its 3.6-unit width always fits with a small margin.
  const scale = useMemo(() => {
    const fov = 32; // must match camera fov below
    const z = 5;    // camera z position
    const vFovRad = (fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFovRad / 2) * z;
    const visibleWidth = visibleHeight * (size.width / size.height);
    const laptopWidth = 3.6; // base geometry width
    const margin = 0.9;     // keep 90% so there's breathing room
    const s = (visibleWidth / laptopWidth) * margin;
    return Math.min(s, 1); // never scale UP, only DOWN on narrow screens
  }, [size]);

  const screenSize = { width: 1060, height: 700, distanceFactor: 1.34 };

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

    const KEY_LABELS = [
      [
        "esc",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
        "F13",
        "⏏",
      ],
      [
        "~",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "del",
        "",
      ],
      [
        "tab",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "[",
        "]",
        "\\",
        "",
      ],
      [
        "caps",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        ";",
        "'",
        "return",
        "",
        "",
      ],
      [
        "shift",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        ",",
        ".",
        "/",
        "shift",
        "",
        "",
        "",
      ],
      [
        "fn",
        "ctrl",
        "opt",
        "cmd",
        "space",
        "",
        "",
        "",
        "",
        "",
        "",
        "cmd",
        "opt",
        "◄",
        "►",
      ],
    ];

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
                label: "",
              });
            }
            continue;
          }
        }

        // F keys
        const isF = r === 0;
        const actualKd = isF ? kd * 0.6 : kd;
        const offsetZ = isF ? -kd * 0.2 : 0;

        const label = KEY_LABELS[r] && KEY_LABELS[r][c] ? KEY_LABELS[r][c] : "";

        list.push({
          pos: [
            startX + c * (kw + gap),
            0.005,
            startZ + r * (kd + gap) + offsetZ,
          ],
          args: [kw, 0.015, actualKd],
          label,
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
    <group ref={groupRef} position={[0, -0.4, 0]} scale={[scale, scale, scale]}>
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
            {k.label && (
              <Text
                position={[
                  -k.args[0] / 2 + 0.015,
                  k.args[1] / 2 + 0.001,
                  k.args[2] / 2 - 0.015,
                ]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={k.label.length > 2 ? 0.025 : 0.035}
                color="#000"
                anchorX="left"
                anchorY="bottom"
              >
                <meshBasicMaterial color={[2, 2, 2]} toneMapped={false} />
                {k.label}
              </Text>
            )}
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
          args={[baseW * 0.98, lidThickness * 1, baseD * 0.98]}
          radius={0.02}
          smoothness={4}
          position={[0, baseD / 2, 0.001]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Browser Screen */}
        <Html
          transform
          occlude={false}
          position={[0, baseD / 2, 0.012]}
          distanceFactor={screenSize.distanceFactor}
          style={{ pointerEvents: openAmount > 0.7 ? "auto" : "none" }}
        >
          <div
            style={{
              width: `${screenSize.width}px`,
              height: `${screenSize.height}px`,
              borderRadius: "8px",
              overflow: "hidden",
              border: "12px solid #000",
              background: "#000",
              position: "relative",
            }}
            className="browser-shadow shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            {/* The Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[14px] bg-[#000] rounded-b-[14px] z-[9999]"
              style={{ boxShadow: "inset 0 -1px 3px rgba(255,255,255,0.1)" }}
            />

            <BrowserScreen active={activeSection} storyProgress={storyProgress} />
          </div>
        </Html>
      </group>
    </group>
  );
}

interface CanvasProps {
  openAmount: number;
  activeSection: SectionId;
  storyProgress: number;
}

export function MacbookCanvas({ openAmount, activeSection, storyProgress }: CanvasProps) {
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

      <MacbookModel openAmount={openAmount} activeSection={activeSection} storyProgress={storyProgress} />

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
