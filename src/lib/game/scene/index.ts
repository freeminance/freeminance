import { Engine, Scene } from "babylonjs";
import { createCamera } from "./camera";
import { createAmbientLight } from "./lights";

export function createScene(target: HTMLCanvasElement): [Engine, Scene] {
    const engine = new Engine(target, true);
    const scene = new Scene(engine);
    createCamera(target, scene);
    createAmbientLight(scene);
    return [engine, scene];
}