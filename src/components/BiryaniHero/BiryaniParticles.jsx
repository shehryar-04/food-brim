import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = [
  new THREE.Color("#EAB308"),
  new THREE.Color("#FACC15"),
  new THREE.Color("#F59E0B"),
  new THREE.Color("#FCD34D"),
  new THREE.Color("#FEF08A"),
  new THREE.Color("#FDE68A"),
];

const _position = new THREE.Vector3();
const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _euler = new THREE.Euler();
const _matrix = new THREE.Matrix4();

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/*
 * Calculates the position of the pot opening without mutating
 * the Three.js object.
 *
 * Pot:
 *   center = [0, 2.15, 0]
 *
 * Opening:
 *   local position ≈ [0, 0.82, 0]
 *
 * Rotation:
 *   around Z
 */
function getPotOpening(progress) {
  const tilt = smoothstep(0.13, 0.34, progress);
  const angle = tilt * (Math.PI / 2 + 0.10);

  const localX = 0;
  const localY = 0.82;

  const x =
    Math.sin(angle) * localY;

  const y =
    2.15 +
    Math.cos(angle) * localY;

  return {
    x,
    y,
    z: 0,
  };
}

export function BiryaniParticles({
  progressRef,
  count = 650,
  isMobile = false,
}) {
  const meshRef = useRef();

  useEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      mesh.setColorAt(
        i,
        COLORS[i % COLORS.length]
      );
    }

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [count]);

  const data = useMemo(() => {
    const birth = new Float32Array(count);
    const spreadX = new Float32Array(count);
    const spreadZ = new Float32Array(count);

    const gravity = new Float32Array(count);
    const drift = new Float32Array(count);

    const rotX = new Float32Array(count);
    const rotY = new Float32Array(count);
    const rotZ = new Float32Array(count);

    const rotSpeedX = new Float32Array(count);
    const rotSpeedY = new Float32Array(count);
    const rotSpeedZ = new Float32Array(count);

    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      /*
       * Rice begins pouring around 0.31.
       *
       * The distribution isn't perfectly linear so the stream
       * feels more organic.
       */
      const normalized = i / count;

      birth[i] =
        0.31 +
        normalized * 0.52 +
        (Math.random() - 0.5) * 0.025;

      spreadX[i] =
        (Math.random() - 0.5) *
        (isMobile ? 0.42 : 0.62);

      spreadZ[i] =
        (Math.random() - 0.5) *
        (isMobile ? 0.28 : 0.48);

      gravity[i] =
        0.82 +
        Math.random() * 0.35;

      drift[i] =
        (Math.random() - 0.5) * 0.35;

      rotX[i] = Math.random() * Math.PI * 2;
      rotY[i] = Math.random() * Math.PI * 2;
      rotZ[i] = Math.random() * Math.PI * 2;

      rotSpeedX[i] =
        (Math.random() - 0.5) * 12;

      rotSpeedY[i] =
        (Math.random() - 0.5) * 10;

      rotSpeedZ[i] =
        (Math.random() - 0.5) * 14;

      /*
       * Actual rice grains are much smaller than the previous
       * implementation.
       */
      scale[i] =
        0.35 +
        Math.random() * 0.55;
    }

    return {
      birth,
      spreadX,
      spreadZ,
      gravity,
      drift,
      rotX,
      rotY,
      rotZ,
      rotSpeedX,
      rotSpeedY,
      rotSpeedZ,
      scale,
    };
  }, [count, isMobile]);

  useFrame(() => {
    const mesh = meshRef.current;

    if (!mesh) return;

    const p = progressRef.current;

    const {
      birth,
      spreadX,
      spreadZ,
      gravity,
      drift,
      rotX,
      rotY,
      rotZ,
      rotSpeedX,
      rotSpeedY,
      rotSpeedZ,
      scale,
    } = data;

    for (let i = 0; i < count; i++) {
      const birthP = birth[i];

      /*
       * Particle hasn't been emitted yet.
       */
      if (p < birthP) {
        _position.set(0, -10, 0);

        _quaternion.identity();

        _scale.set(0.001, 0.001, 0.001);

        _matrix.compose(
          _position,
          _quaternion,
          _scale
        );

        mesh.setMatrixAt(i, _matrix);

        continue;
      }

      /*
       * Lifetime extends until the end of the animation.
       */
      const life = clamp01(
        (p - birthP) /
        Math.max(0.001, 1 - birthP)
      );

      /*
       * Actual pot opening at the moment this grain
       * was emitted.
       */
      const start = getPotOpening(birthP);

      /*
       * Destination is randomized slightly so the rice
       * doesn't create a perfect single point.
       */
      const targetX =
        spreadX[i] * 0.35;

      const targetZ =
        spreadZ[i] * 0.30;

      const targetY = -1.38;

      /*
       * Gravity-like trajectory.
       *
       * Horizontal motion is smooth.
       *
       * Vertical motion accelerates toward the box.
       */
      const horizontalT =
        smoothstep(0, 1, life);

      const gravityT =
        Math.pow(life, 1.65 * gravity[i]);

      let x =
        start.x +
        (targetX - start.x) *
        horizontalT;

      let z =
        start.z +
        (targetZ - start.z) *
        horizontalT;

      let y =
        start.y +
        (targetY - start.y) *
        gravityT;

      /*
       * Natural stream turbulence.
       */
      const turbulence =
        Math.sin(
          life * Math.PI * 3 +
          i * 0.71
        ) *
        Math.sin(life * Math.PI) *
        0.075;

      x += turbulence;
      z += Math.cos(
        life * Math.PI * 2 +
        i
      ) *
        Math.sin(life * Math.PI) *
        0.05;

      /*
       * Slight lateral drift.
       */
      x +=
        drift[i] *
        life *
        Math.sin(life * Math.PI);

      /*
       * Final disappearance as grain enters
       * the box.
       */
      const settleFade =
        life > 0.86
          ? 1 -
          (life - 0.86) /
          0.14
          : 1;

      const s =
        scale[i] *
        settleFade;

      /*
       * Tumbling rice grain.
       */
      _euler.set(
        rotX[i] +
        life * rotSpeedX[i],
        rotY[i] +
        life * rotSpeedY[i],
        rotZ[i] +
        life * rotSpeedZ[i]
      );

      _quaternion.setFromEuler(
        _euler
      );

      _position.set(x, y, z);

      _scale.set(
        s,
        s,
        s
      );

      _matrix.compose(
        _position,
        _quaternion,
        _scale
      );

      mesh.setMatrixAt(i, _matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, count]}
      frustumCulled={false}
      castShadow
    >
      <capsuleGeometry
        args={[0.026, 0.095, 3, 6]}
      />

      <meshStandardMaterial
        vertexColors
        roughness={0.72}
        metalness={0.02}
      />
    </instancedMesh>
  );
}