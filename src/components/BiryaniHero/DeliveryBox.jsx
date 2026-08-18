import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

const BOX_MAT = new THREE.MeshStandardMaterial({
  color: "#A85A13",
  roughness: 0.82,
  metalness: 0.02,
});

const BOX_EDGE_MAT = new THREE.MeshStandardMaterial({
  color: "#6F350E",
  roughness: 0.9,
  metalness: 0,
});

const BOX_INNER_MAT = new THREE.MeshStandardMaterial({
  color: "#552A0A",
  roughness: 0.92,
  metalness: 0,
});

const LABEL_MAT = new THREE.MeshStandardMaterial({
  color: "#FEF3C7",
  roughness: 0.9,
  metalness: 0,
});

const ACCENT_MAT = new THREE.MeshStandardMaterial({
  color: "#F97316",
  roughness: 0.8,
  metalness: 0,
  emissive: "#7C2D12",
  emissiveIntensity: 0.18,
});

const RICE_MAT = new THREE.MeshStandardMaterial({
  color: "#F59E0B",
  roughness: 0.9,
  metalness: 0,
});

const RICE_LIGHT_MAT = new THREE.MeshStandardMaterial({
  color: "#FCD34D",
  roughness: 0.92,
  metalness: 0,
});

const W = 2.35;
const H = 1.35;
const D = 2.05;

function RicePile({ progressRef }) {
  const groupRef = useRef();

  const grains = useMemo(() => {
    const items = [];

    const count = 70;

    for (let i = 0; i < count; i++) {
      const angle =
        Math.random() * Math.PI * 2;

      const radius =
        Math.sqrt(Math.random()) *
        0.85;

      items.push({
        x:
          Math.cos(angle) *
          radius,

        z:
          Math.sin(angle) *
          radius *
          0.72,

        y:
          0.72 +
          Math.random() * 0.18,

        rotation:
          Math.random() *
          Math.PI *
          2,

        scale:
          0.45 +
          Math.random() *
          0.55,

        phase:
          Math.random(),
      });
    }

    return items;
  }, []);

  useFrame(() => {
    const group = groupRef.current;

    if (!group) return;

    const p = progressRef.current;

    const fill = smoothstep(
      0.62,
      0.94,
      p
    );

    group.scale.y =
      Math.max(0.01, fill);

    group.scale.x =
      0.85 +
      fill * 0.15;

    group.scale.z =
      0.85 +
      fill * 0.15;

    group.visible = p > 0.55;
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
    >
      {grains.map((grain, i) => (
        <mesh
          key={i}
          position={[
            grain.x,
            grain.y,
            grain.z,
          ]}
          rotation={[
            grain.phase * 0.5,
            grain.rotation,
            grain.phase,
          ]}
          scale={[
            grain.scale,
            grain.scale,
            grain.scale,
          ]}
          material={
            i % 4 === 0
              ? RICE_LIGHT_MAT
              : RICE_MAT
          }
        >
          <capsuleGeometry
            args={[0.025, 0.09, 3, 6]}
          />
        </mesh>
      ))}
    </group>
  );
}

export function DeliveryBox({
  progressRef,
}) {
  const groupRef = useRef();
  const lidRef = useRef();
  const glowRef = useRef();

  useFrame(() => {
    const group = groupRef.current;

    if (!group) return;

    const p = progressRef.current;

    /*
     * Box enters from below.
     */
    const appear = smoothstep(
      0.25,
      0.43,
      p
    );

    group.scale.setScalar(appear);

    /*
     * Slight rise while appearing.
     */
    group.position.y =
      -2.55 +
      appear * 0.35;

    /*
     * Lid starts opening before the rice arrives.
     */
    if (lidRef.current) {
      const open = smoothstep(
        0.43,
        0.63,
        p
      );

      /*
       * Hinge at the back.
       */
      lidRef.current.rotation.x =
        -open * Math.PI * 0.52;

      lidRef.current.position.y =
        H / 2;

      /*
       * Tiny dramatic overshoot.
       */
      const overshoot =
        smoothstep(
          0.62,
          0.70,
          p
        ) *
        (1 -
          smoothstep(
            0.70,
            0.78,
            p
          ));

      lidRef.current.rotation.x +=
        overshoot * 0.05;
    }

    /*
     * Warm glow becomes stronger as rice fills
     * the box.
     */
    if (glowRef.current) {
      glowRef.current.intensity =
        smoothstep(
          0.68,
          0.94,
          p
        ) * 1.15;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -2.55, 0]}
    >
      {/* Main box */}
      <mesh
        castShadow
        receiveShadow
        material={BOX_MAT}
      >
        <boxGeometry
          args={[W, H, D]}
        />
      </mesh>

      {/* Dark inner top */}
      <mesh
        position={[
          0,
          H / 2 + 0.012,
          0,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        material={BOX_INNER_MAT}
      >
        <planeGeometry
          args={[
            W - 0.12,
            D - 0.12,
          ]}
        />
      </mesh>

      {/* Front label */}
      <mesh
        position={[
          0,
          0.04,
          D / 2 + 0.012,
        ]}
        material={LABEL_MAT}
      >
        <planeGeometry
          args={[
            W - 0.32,
            H - 0.25,
          ]}
        />
      </mesh>

      {/* FoodBrim branding */}
      <mesh
        position={[
          0,
          0.28,
          D / 2 + 0.019,
        ]}
        material={ACCENT_MAT}
      >
        <boxGeometry
          args={[1.65, 0.17, 0.015]}
        />
      </mesh>

      <mesh
        position={[
          0,
          0.04,
          D / 2 + 0.019,
        ]}
        material={ACCENT_MAT}
      >
        <boxGeometry
          args={[1.65, 0.055, 0.015]}
        />
      </mesh>

      <mesh
        position={[
          0,
          -0.18,
          D / 2 + 0.019,
        ]}
        material={ACCENT_MAT}
      >
        <boxGeometry
          args={[1.65, 0.055, 0.015]}
        />
      </mesh>

      {/* Cardboard fold lines */}
      {[-0.30, 0.30].map((y) => (
        <mesh
          key={y}
          position={[
            0,
            y,
            D / 2 + 0.014,
          ]}
          material={BOX_EDGE_MAT}
        >
          <boxGeometry
            args={[
              W - 0.08,
              0.018,
              0.012,
            ]}
          />
        </mesh>
      ))}

      {/* Corner supports */}
      {[
        -W / 2 + 0.035,
        W / 2 - 0.035,
      ].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0]}
          material={BOX_EDGE_MAT}
        >
          <boxGeometry
            args={[
              0.045,
              H + 0.04,
              D + 0.04,
            ]}
          />
        </mesh>
      ))}

      {/* Lid */}
      <group
        ref={lidRef}
        position={[
          0,
          H / 2,
          -D / 2,
        ]}
      >
        <mesh
          position={[
            0,
            0,
            D / 2,
          ]}
          castShadow
          material={BOX_MAT}
        >
          <boxGeometry
            args={[
              W,
              0.07,
              D,
            ]}
          />
        </mesh>

        {/* Front flap */}
        <mesh
          position={[
            0,
            -0.01,
            D + 0.13,
          ]}
          material={BOX_MAT}
        >
          <boxGeometry
            args={[
              W,
              0.07,
              0.28,
            ]}
          />
        </mesh>

        {/* Inner lid strip */}
        <mesh
          position={[
            0,
            -0.045,
            0.35,
          ]}
          material={BOX_EDGE_MAT}
        >
          <boxGeometry
            args={[
              W - 0.15,
              0.018,
              0.12,
            ]}
          />
        </mesh>
      </group>

      {/* Accumulating rice */}
      <RicePile
        progressRef={progressRef}
      />

      {/* Warm food glow */}
      <pointLight
        ref={glowRef}
        position={[
          0,
          0.65,
          0,
        ]}
        intensity={0}
        color="#F97316"
        distance={3.5}
        decay={2}
      />
    </group>
  );
}