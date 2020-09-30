import { PrefSetAction } from "./types";

export const setPref = (
    key: PrefSetAction["payload"]["key"],
    value: PrefSetAction["payload"]["value"]
): PrefSetAction => {
    return {
        payload: {
            key,
            value,
        },
        type: "@@pref/set",
    };
};
