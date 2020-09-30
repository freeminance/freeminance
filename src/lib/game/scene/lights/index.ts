import { HemisphericLight, Scene, Vector3 } from "babylonjs";

export function createAmbientLight(scene: Scene): void {
    const ambientLight = new HemisphericLight("Sun", new Vector3(1, 1, 0), scene);
}