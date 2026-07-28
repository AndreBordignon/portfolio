"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "./sceneStore";

const COUNT_DESKTOP = 26000;
const COUNT_MOBILE = 9000;

/**
 * Série de "candles" determinística — o mesmo tipo de dado que vira terreno no
 * Candle Cross. Random walk semeada, então o skyline é sempre o mesmo.
 */
function candleSeries(bins: number) {
  let seed = 20260727;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const closes: number[] = [];
  let price = 0;
  for (let i = 0; i < bins; i++) {
    price += (rnd() - 0.46) * 0.9;
    closes.push(price);
  }

  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const span = max - min || 1;

  return closes.map((c, i) => {
    const norm = (c - min) / span; // 0 → 1
    const prev = i === 0 ? norm : (closes[i - 1] - min) / span;
    return {
      base: Math.min(prev, norm),
      top: Math.max(prev, norm),
      up: norm >= prev,
      wick: 0.14 + rnd() * 0.22,
    };
  });
}

type Props = { reduced: boolean; mobile: boolean };

export default function EmberField({ reduced, mobile }: Props) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  // Estado A (nuvem de brasa) e estado B (skyline de candles) por partícula.
  const { positions, targets, randoms, scales, count } = useMemo(() => {
    const count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const scales = new Float32Array(count);

    const bins = 46;
    const candles = candleSeries(bins);
    const width = 13.5;
    const binWidth = width / bins;
    const height = 4.6;

    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      // --- A: casca esférica irregular, tipo faísca suspensa
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAt = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const shell = 2.55 + Math.pow(Math.random(), 2.2) * 1.35;

      positions[i * 3] = Math.cos(theta) * radiusAt * shell * 1.35;
      positions[i * 3 + 1] = y * shell * 0.82;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAt * shell;

      // --- B: o candle
      const bin = i % bins;
      const c = candles[bin];
      const x = -width / 2 + bin * binWidth + binWidth * 0.5;

      // 1 em 6 partículas forma o pavio; o resto preenche o corpo
      const isWick = i % 6 === 0;
      const bodyLow = c.base * height - height * 0.5;
      const bodyHigh = c.top * height - height * 0.5;

      let ty: number;
      let tx: number;
      if (isWick) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        ty =
          (dir > 0 ? bodyHigh : bodyLow) + dir * Math.random() * c.wick * height * 0.9;
        tx = x + (Math.random() - 0.5) * binWidth * 0.12;
      } else {
        ty = bodyLow + Math.random() * Math.max(0.08, bodyHigh - bodyLow);
        tx = x + (Math.random() - 0.5) * binWidth * 0.72;
      }

      targets[i * 3] = tx;
      targets[i * 3 + 1] = ty;
      targets[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      randoms[i] = Math.random();
      scales[i] = 0.45 + Math.pow(Math.random(), 3) * 1.9;
    }

    return { positions, targets, randoms, scales, count };
  }, [mobile]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: mobile ? 13 : 17 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 0 },
      uColorLow: { value: new THREE.Color("#c2410c") },
      uColorHigh: { value: new THREE.Color("#ffd9a8") },
    }),
    [mobile],
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;

    const { progress, pointer } = useSceneStore.getState();
    const d = Math.min(delta, 0.05);

    m.uniforms.uTime.value += d;
    // Fade-in do campo depois que o primeiro paint já aconteceu.
    m.uniforms.uOpacity.value = THREE.MathUtils.damp(
      m.uniforms.uOpacity.value,
      1,
      1.6,
      d,
    );
    m.uniforms.uProgress.value = THREE.MathUtils.damp(
      m.uniforms.uProgress.value,
      reduced ? Math.round(progress) : progress,
      6,
      d,
    );
    m.uniforms.uPointer.value.x = THREE.MathUtils.damp(
      m.uniforms.uPointer.value.x,
      reduced ? 0 : pointer.x,
      3,
      d,
    );
    m.uniforms.uPointer.value.y = THREE.MathUtils.damp(
      m.uniforms.uPointer.value.y,
      reduced ? 0 : pointer.y,
      3,
      d,
    );

    if (points.current && !reduced) {
      // A nuvem gira; o candle fica parado. A rotação some conforme forma.
      const settle = 1 - m.uniforms.uProgress.value;
      points.current.rotation.y += d * 0.055 * settle;
      points.current.rotation.x = pointer.y * 0.06 * settle;
    }

    // Câmera recua de leve enquanto o skyline se forma.
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      7.4 + m.uniforms.uProgress.value * 1.4,
      2,
      d,
    );
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targets, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          uniform float uTime;
          uniform float uProgress;
          uniform float uSize;
          uniform vec2 uPointer;

          attribute vec3 aTarget;
          attribute float aRandom;
          attribute float aScale;

          varying float vForm;
          varying float vRandom;

          void main() {
            // Cada partícula chega num tempo levemente diferente: o skyline
            // "cristaliza" em vez de aparecer de uma vez.
            float t = clamp((uProgress - aRandom * 0.28) / 0.72, 0.0, 1.0);
            t = t * t * (3.0 - 2.0 * t);

            vec3 pos = mix(position, aTarget, t);

            // Respiração de brasa — nunca para de todo.
            float wob = sin(uTime * 0.7 + aRandom * 24.0);
            pos.x += wob * 0.05 * (1.0 - t * 0.6);
            pos.y += cos(uTime * 0.5 + aRandom * 18.0) * 0.06 * (1.0 - t * 0.55);
            pos.z += wob * 0.04;

            // Parallax do ponteiro, mais forte nas partículas da frente.
            pos.x += uPointer.x * (0.22 + aRandom * 0.3);
            pos.y += uPointer.y * (0.14 + aRandom * 0.22);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * aScale * (1.0 / max(0.001, -mv.z)) * 2.2;

            vForm = t;
            vRandom = aRandom;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColorLow;
          uniform vec3 uColorHigh;
          uniform float uOpacity;

          varying float vForm;
          varying float vRandom;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.0, d);
            alpha *= alpha;

            vec3 col = mix(uColorLow, uColorHigh, clamp(vForm * 0.55 + vRandom * 0.5, 0.0, 1.0));
            gl_FragColor = vec4(col, alpha * uOpacity * (0.35 + vRandom * 0.65));
          }
        `}
      />
    </points>
  );
}
