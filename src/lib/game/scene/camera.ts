import { ArcRotateCamera, Camera, Scene, Vector3 } from "babylonjs";

export function createCamera(target: HTMLCanvasElement, scene: Scene): Camera {
    const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2 , new Vector3(0, 0, 5), scene);
    camera.attachControl(target, true);
    return camera;
}