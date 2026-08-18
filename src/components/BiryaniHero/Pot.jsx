import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POT_BODY_MAT = new THREE.MeshStandardMaterial({
  color: "#252B36",
  metalness: 0.78,
  roughness: 0.24,
  side: THREE.DoubleSide,
});

const POT_RIM_MAT = new THREE.MeshStandardMaterial({
  color: "#727984",
  metalness: 0.88,
  roughness: 0.14,
});

const BIRYANI_MAT = new THREE.MeshStandardMaterial({
  color: "#E89B0C",
  roughness: 0.95,
  metalness: 0,
  emissive: "#7C2D12",
  emissiveIntensity: 0.08,
});

const BIRYANI_TOP_MAT = new THREE.MeshStandardMaterial({
  color: "#F59E0B",
  roughness: 0.92,
  metalness: 0,
  emissive: "#78350F",
  emissiveIntensity: 0.08,
});

const STEAM_MAT = new THREE.MeshStandardMaterial({
  color: "#E5E7EB",
  transparent: true,
  opacity: 0.08,
  roughness: 1,
  metalness: 0,
  depthWrite: false,
});

function smoothstep(a, b, x) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export function Pot({ progressRef, potRef, isMobile }) {
  const internalRef = useRef();
  const lidRef = useRef();
  const glowRef = useRef();

  const setPotRef = (node) => {
    internalRef.current = node;

    if (potRef) {
      potRef.current = node;
    }
  };

  useFrame(() => {
    const pot = internalRef.current;

    if (!pot) return;

    const p = progressRef.current;

    /*
     * Pot remains stable initially.
     * It then dramatically rotates toward the delivery box.
     */
    const tiltT = smoothstep(0.13, 0.34, p);

    const tiltAngle = tiltT * (Math.PI / 2 + 0.10);

    pot.rotation.z = -tiltAngle;

    /*
     * Slight cinematic floating before pouring.
     */
    const idleAmount = 1 - smoothstep(0.0, 0.15, p);

    pot.position.y =
      2.15 +
      Math.sin(performance.now() * 0.0015) * 0.035 * idleAmount;

    /*
     * Keep pot position X centered at 0.
     */
    pot.position.x = 0;

    /*
     * Lid animation.
     *
     * First it rises slightly.
     * Then it slides toward the side as the pot tilts.
     */
    if (lidRef.current) {
      const lidT = smoothstep(0.15, 0.31, p);

      lidRef.current.position.y = 0.94 + lidT * 0.42;
      lidRef.current.position.x = lidT * 0.30;
      lidRef.current.rotation.z = lidT * 0.24;
      lidRef.current.rotation.x = lidT * 0.18;

      lidRef.current.scale.set(
        1 - lidT * 0.05,
        1 - lidT * 0.05,
        1 - lidT * 0.05
      );

      lidRef.current.visible = p < 0.46;
    }

    if (glowRef.current) {
      const pulse =
        0.72 + Math.sin(performance.now() * 0.002) * 0.12;

      const pourGlow = smoothstep(0.25, 0.45, p);

      glowRef.current.intensity =
        pulse + pourGlow * 0.35;
    }
  });

  return (
    <group
      ref={setPotRef}
      position={[0, 2.15, 0]}
    >
      {/* Main pot */}
      <mesh
        castShadow
        receiveShadow
        material={POT_BODY_MAT}
      >
        <cylinderGeometry
          args={[1.08, 0.98, 1.8, 40, 1, true]}
        />
      </mesh>

      {/* Bottom */}
      <mesh
        position={[0, -0.9, 0]}
        rotation={[Math.PI, 0, 0]}
        material={POT_BODY_MAT}
        receiveShadow
      >
        <circleGeometry args={[0.98, 40]} />
      </mesh>

      {/* Biryani body */}
      <mesh
        position={[0, 0.61, 0]}
        material={BIRYANI_MAT}
      >
        <cylinderGeometry
          args={[1.02, 1.02, 0.13, 36]}
        />
      </mesh>

      {/* Biryani top */}
      <mesh
        position={[0, 0.69, 0]}
        material={BIRYANI_TOP_MAT}
      >
        <circleGeometry args={[1.02, 36]} />
      </mesh>

      {/* Decorative rice clumps */}
      {!isMobile &&
        Array.from({ length: 18 }, (_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const radius = 0.2 + (i % 5) * 0.13;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                0.77 + (i % 3) * 0.018,
                Math.sin(angle) * radius,
              ]}
              rotation={[
                0,
                angle,
                (i % 2) * 0.5,
              ]}
              material={BIRYANI_MAT}
            >
              <capsuleGeometry
                args={[0.025, 0.075, 3, 6]}
              />
            </mesh>
          );
        })}

      {/* Outer rim */}
      <mesh
        position={[0, 0.9, 0]}
        castShadow
        material={POT_RIM_MAT}
      >
        <torusGeometry
          args={[1.10, 0.075, 14, 64]}
        />
      </mesh>

      {/* Inner rim */}
      <mesh
        position={[0, 0.88, 0]}
        material={POT_RIM_MAT}
      >
        <torusGeometry
          args={[1.01, 0.032, 8, 40]}
        />
      </mesh>

      {/* Left handle */}
      <group
        position={[-1.24, 0.18, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <mesh castShadow material={POT_RIM_MAT}>
          <capsuleGeometry args={[0.065, 0.40, 8, 10]} />
        </mesh>

        <mesh
          position={[0, -0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={POT_RIM_MAT}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
        </mesh>

        <mesh
          position={[0, 0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={POT_RIM_MAT}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
        </mesh>
      </group>

      {/* Right handle */}
      <group
        position={[1.24, 0.18, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <mesh castShadow material={POT_RIM_MAT}>
          <capsuleGeometry args={[0.065, 0.40, 8, 10]} />
        </mesh>

        <mesh
          position={[0, -0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={POT_RIM_MAT}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
        </mesh>

        <mesh
          position={[0, 0.25, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={POT_RIM_MAT}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.06, 12]} />
        </mesh>
      </group>

      {/* Lid */}
      <group
        ref={lidRef}
        position={[0, 0.94, 0]}
      >
        <mesh
          castShadow
          material={POT_BODY_MAT}
        >
          <cylinderGeometry
            args={[1.17, 1.12, 0.13, 40]}
          />
        </mesh>

        <mesh
          position={[0, 0.17, 0]}
          castShadow
          material={POT_RIM_MAT}
        >
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>

        <mesh
          position={[0, 0.08, 0]}
          material={POT_RIM_MAT}
        >
          <torusGeometry
            args={[0.16, 0.025, 8, 24]}
          />
        </mesh>
      </group>

      {/* Warm food glow */}
      <pointLight
        ref={glowRef}
        position={[0, 0.55, 0]}
        intensity={0.8}
        color="#F97316"
        distance={4}
        decay={2}
      />

      {/* Subtle top light */}
      <pointLight
        position={[0, 1.0, 0.4]}
        intensity={0.25}
        color="#FBBF24"
        distance={2.5}
        decay={2}
      />
    </group>
  );
}