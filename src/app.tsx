import ReactDOM from "react-dom";
import React from "react";

function render(target: HTMLElement) {
    ReactDOM.render(<h1>Freeminance</h1>, target);
}

export function init(target: HTMLElement) {
    // TODO: Setup the store
    // TODO: Setup the router
    render(target);
}