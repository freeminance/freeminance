import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Engine, MeshBuilder, Scene } from "babylonjs";

import { createScene } from "../../game/scene";
import GameUI from "../../game/ui";

const StyledGame = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledCanvas = styled.canvas`
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
`;

export function Game() {
    // Reference to the canvas element
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Store the scene and the engine in state
    const [engine, setEngine] = useState<Engine | null>(null);
    const [scene, setScene] = useState<Scene | null>(null);

    // Scaling
    const [scale, setScale] = useState<number>(1);

    // After initial draw setup the canvas as the target for the engine and return the
    // deconstruct when unmounted
    useLayoutEffect(() => {
        if (canvasRef.current) {
            const [gameEngine, gameScene] = createScene(canvasRef.current);

            // Setup the render loop
            gameEngine.runRenderLoop(() => {
                gameScene.render();
            });

            // Setup the resizer
            const resizer = () => {
                // Resize the UI
                setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
                // Resize the engine
                gameEngine.resize();
            };
            window.addEventListener("resize", resizer);

            // Assign to state
            setEngine(gameEngine);
            setScene(gameScene);

            return () => {
                window.removeEventListener("resize", resizer);
                gameEngine.stopRenderLoop();
            };
        } else {
            throw new Error("Canvas unavailable");
        }
    }, []);

    // Generate basic scenery
    useEffect(() => {
        MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
    }, [scene !== null]);

    return (
        <StyledGame>
            <StyledCanvas touch-action="none" ref={canvasRef} />
            <GameUI scale={scale} />
        </StyledGame>
    );
}
