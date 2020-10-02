import { Action } from "redux";

export const enum GameTerrain {
    Water = "water",
    DeepWater = "deep-water",
    Desert = "desert",
    Forest = "forest",
    RainForest = "rain-forest",
}

export interface GameUIState {
    views: {
        id: string;
        state: any;
    }[];
}

/**
 * Game state expressed as a single structure.
 */
export interface GameState {
    game: {
        turn: number;
        year: number;
        pace: number;
    };

    ui?: {
    };

    map: {
        x: number;
        y: number;
        improvements: {}[];
        terrain: GameTerrain;
        // TODO: lol don't do this
        owner: GameState["nations"][0]["id"];
    }[][];

    nations: {
        id: string;
        title: string;
        flag: string;
        met: [ ];
        flags: {
            player: boolean;
            active: boolean;
        };
    }[];
}

export interface GameAdvanceTurnAction extends Action<"@@game/advance-turn"> {
    payload: {
        count?: number;
    };
}

export type GameAction = GameAdvanceTurnAction;