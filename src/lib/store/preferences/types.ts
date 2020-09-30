import { Action } from "redux";

export interface PrefState {
    [key:string]: string | number | boolean | null;
}

export interface PrefSetAction extends Action<"@@pref/set"> {
    payload: {
        key: keyof PrefState;
        value: PrefState[keyof PrefState];
    }
}

export type PrefAction = PrefSetAction;