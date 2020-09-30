import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { batchDispatchMiddleware } from "redux-batched-actions";

import { reducer as preferences } from "./preferences/reducer";
import { PrefAction } from "./preferences/types";

const reducers = {
    preferences,
};

type ReducerType = typeof reducers;

export type StoreState = { [key in keyof ReducerType]: ReturnType<ReducerType[key]> };

declare module "react-redux" {
    interface DefaultRootState extends StoreState {}
}

export type StoreAction = PrefAction;

export default function (): Store<StoreState, StoreAction> {
    const composeEnhancers = composeWithDevTools({
        name: "freeminance",
    });

    return createStore<StoreState, StoreAction, unknown, unknown>(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(batchDispatchMiddleware))
    );
}
