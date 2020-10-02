import React from "react";
import { Link } from "react-router-dom";

import Clock from "./components/clock";
import Turns from "./components/turns";

const Menu = () => {
    return (
        <>
            <Turns />
            <Clock />
        </>
    );
};

export default Menu;
