import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import createStore from "./store";
import { initDB } from "./db";
import { Home } from "./routes/home";
import Menu from "./routes/menu";
import { Game } from "./routes/game";
import { Provider } from "react-redux";

const store = createStore();

function render(target: HTMLElement) {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/menu">
                        <Menu />
                    </Route>
                    <Route path="/game">
                        <Game />
                    </Route>
                </Switch>
            </Router>
        </Provider>,
        target
    );
}

export async function init(target: HTMLElement | null) {
    if (target) {
        // Initialise the database
        await initDB();

        // First render
        render(target);
    } else {
        throw Error("No element provided to root render");
    }
}
