import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import createStore from "./store";
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

export function init(target: HTMLElement) {
    render(target);
}
