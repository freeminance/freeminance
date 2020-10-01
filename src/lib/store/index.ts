import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { batchDispatchMiddleware } from "redux-batched-actions";
import createSagaMiddleWare from "redux-saga";

import { reducer as game } from "./game/reducer";
import { GameAction } from "./game/types";
import { reducer as preferences } from "./preferences/reducer";
import prefSagas from "./preferences/sagas";
import { PrefAction } from "./preferences/types";

const reducers = {
    game,
    preferences,
};

type ReducerType = typeof reducers;

export type StoreState = { [key in keyof ReducerType]: ReturnType<ReducerType[key]> };

declare module "react-redux" {
    interface DefaultRootState extends StoreState {}
}

export type StoreAction = GameAction | PrefAction;

export default function (): Store<StoreState, StoreAction> {
    const composeEnhancers = composeWithDevTools({
        name: "freeminance",
    });

    const sagaMiddleware = createSagaMiddleWare();

    const store = createStore<StoreState, StoreAction, unknown, unknown>(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(batchDispatchMiddleware, sagaMiddleware))
    );

    sagaMiddleware.run(prefSagas);

    return store;
}
