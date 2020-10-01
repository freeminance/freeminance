import React from "react";
import Clock from "./components/clock";
import Turns from "./components/turns";
import styled from "styled-components";

const Menu = () => {
    return (
        <>
            <Turns />
            <Clock />
            <button>X</button>
        </>
    );
};

export default Menu;
