import { GameState } from "../store/game/types";

export interface SaveGame {
    id: string;
    timestamp: number;
    game: GameState;
}