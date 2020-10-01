import { GameAction, GameState } from "./types";

const initialState: GameState = {
    game: {
        turn: 0,
        year: 0,
        pace: 0,
    },
    map: [[]],
    nations: [],
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        default:
            return state;
    }
}
