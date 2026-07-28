import { create } from "zustand";

type SceneState = {
  /** Progresso 0→1 do pin do herói, alimentado pelo ScrollTrigger. */
  progress: number;
  /** Ponteiro normalizado (-1 → 1) para o parallax da câmera. */
  pointer: { x: number; y: number };
};

/**
 * Ponte DOM → WebGL. O ScrollTrigger é a única fonte de scroll do site; ele
 * escreve aqui e o Canvas lê no useFrame — sem re-render de React por frame.
 */
export const useSceneStore = create<SceneState>(() => ({
  progress: 0,
  pointer: { x: 0, y: 0 },
}));

export const setSceneProgress = (progress: number) =>
  useSceneStore.setState({ progress });

export const setScenePointer = (x: number, y: number) =>
  useSceneStore.setState({ pointer: { x, y } });
