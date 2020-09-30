import { PrefState, PrefAction } from "./types";

export function reducer(state: PrefState = {}, action: PrefAction): PrefState {
    switch (action.type) {
        case "@@pref/set":
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        default:
            return state;
    }
}
