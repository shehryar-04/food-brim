import { useRef } from "react";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

import { Pot } from "./Pot";
import { DeliveryBox } from "./DeliveryBox";
import { BiryaniParticles } from "./BiryaniParticles";

const CAM_START = new THREE.Vector3(
  2.25,
  0.25,
  8.6
);

const CAM_MID = new THREE.Vector3(
  1.7,
  -0.35,
  8.2
);

const CAM_END = new THREE.Vector3(
  0.15,
  -1.15,
  8.0
);

const LOOK_START = new THREE.Vector3(
  0,
  0.25,
  0
);

const LOOK_MID = new THREE.Vector3(
  0,
  -0.25,
  0
);

const LOOK_END = new THREE.Vector3(
  0,
  -1.55,
  0
);

function smoothstep(a, b, x) {
  const t = THREE.MathUtils.clamp(
    (x - a) / (b - a),
    0,
    1
  );

  return t * t * (3 - 2 * t);
}

function CameraRig({ progressRef }) {
  const { camera } = useThree();

  const position = useRef(
    new THREE.Vector3()
  );

  const target = useRef(
    new THREE.Vector3()
  );

  useFrame(() => {
    const p = progressRef.current;

    if (p < 0.5) {
      const t = smoothstep(
        0,
        0.5,
        p
      );

      position.current.lerpVectors(
        CAM_START,
        CAM_MID,
        t
      );

      target.current.lerpVectors(
        LOOK_START,
        LOOK_MID,
        t
      );
    } else {
      const t = smoothstep(
        0.5,
        1,
        p
      );

      position.current.lerpVectors(
        CAM_MID,
        CAM_END,
        t
      );

      target.current.lerpVectors(
        LOOK_MID,
        LOOK_END,
        t
      );
    }

    camera.position.copy(
      position.current
    );

    camera.lookAt(
      target.current
    );
  });

  return null;
}

function SceneLights() {
  return (
    <>
      <ambientLight
        intensity={0.5}
        color="#334155"
      />

      <directionalLight
        position={[5, 10, 6]}
        intensity={2.2}
        color="#FFF8E7"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.001}
      />

      <directionalLight
        position={[-5, 4, -4]}
        intensity={0.55}
        color="#93C5FD"
      />

      <pointLight
        position={[0, 3, 4]}
        intensity={0.8}
        color="#F97316"
        distance={12}
        decay={2}
      />
    </>
  );
}

function Ground() {
  return (
    <mesh
      rotation={[
        -Math.PI / 2,
        0,
        0,
      ]}
      position={[
        0,
        -4,
        0,
      ]}
      receiveShadow
    >
      <planeGeometry
        args={[20, 20]}
      />

      <meshStandardMaterial
        color="#090D14"
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const STEAM_COUNT = 12;

const steamData = Array.from(
  { length: STEAM_COUNT },
  (_, i) => ({
    x:
      (Math.random() - 0.5) *
      0.65,

    z:
      (Math.random() - 0.5) *
      0.55,

    phase:
      Math.random() *
      Math.PI *
      2,

    speed:
      0.35 +
      Math.random() *
      0.45,

    size:
      0.10 +
      Math.random() *
      0.15,
  })
);

function Steam({
  progressRef,
}) {
  const groupRef = useRef();

  useFrame(() => {
    const group =
      groupRef.current;

    if (!group) return;

    const p =
      progressRef.current;

    const visible =
      p < 0.37;

    group.visible =
      visible;

    if (!visible) return;

    const now =
      performance.now() *
      0.001;

    const fade =
      1 -
      smoothstep(
        0.16,
        0.37,
        p
      );

    group.children.forEach(
      (puff, i) => {
        const d =
          steamData[i];

        const cycle =
          (now * d.speed +
            d.phase) %
          1;

        const rise =
          cycle * 1.35;

        puff.position.set(
          d.x +
          Math.sin(
            now * 0.7 +
            d.phase
          ) *
          0.08,

          2.82 + rise,

          d.z +
          Math.cos(
            now * 0.55 +
            d.phase
          ) *
          0.06
        );

        const scale =
          d.size *
          (0.5 + cycle * 1.15);

        puff.scale.setScalar(
          scale
        );

        puff.material.opacity =
          0.10 *
          (1 - cycle) *
          fade;
      }
    );
  });

  return (
    <group ref={groupRef}>
      {steamData.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry
            args={[
              1,
              8,
              8,
            ]}
          />

          <meshStandardMaterial
            color="#E5E7EB"
            transparent
            opacity={0.1}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function BiryaniScene({
  progressRef,
  isMobile,
}) {
  const potRef = useRef();

  const particleCount = isMobile
    ? 220
    : 700;

  const dpr = isMobile
    ? [1, 1.35]
    : [1, 1.75];

  return (
    <Canvas
      dpr={dpr}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#090D14", 1);
        scene.background = new THREE.Color("#090D14");
      }}
      camera={{
        fov: 48,
        near: 0.1,
        far: 60,
        position: [
          2.25,
          0.25,
          8.6,
        ],
      }}
      shadows
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference:
          "high-performance",
      }}
      style={{
        background:
          "transparent",
      }}
    >
      <SceneLights />

      <CameraRig
        progressRef={
          progressRef
        }
      />

      <Ground />

      <ContactShadows
        position={[
          0,
          -3.96,
          0,
        ]}
        opacity={0.55}
        scale={11}
        blur={2.8}
        far={8}
        color="#000000"
      />

      <Pot
        progressRef={
          progressRef
        }
        potRef={potRef}
        isMobile={isMobile}
      />

      <DeliveryBox
        progressRef={
          progressRef
        }
      />

      <BiryaniParticles
        progressRef={
          progressRef
        }
        count={
          particleCount
        }
        isMobile={
          isMobile
        }
      />

      <Steam
        progressRef={
          progressRef
        }
      />
    </Canvas>
  );
}