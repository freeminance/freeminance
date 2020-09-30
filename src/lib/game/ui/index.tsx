import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

interface GameUIProps {
    /**
     * rem based font scale that manages all other em sizes
     */
    scale: number;
}

const StyledUI = styled.div<Pick<GameUIProps, "scale">>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    font-size: ${props => props.scale}rem;
    grid-template-columns: 4em auto 12em;
    grid-template-rows: 4em auto 12em;
    grid-template-areas: "menu hud orbs" ". . ." "unit unit unit";
    pointer-events: none;

    .menu,
    .hud,
    .orbs,
    .unit {
        pointer-events: auto;
    }

    .menu {
        grid-area: menu;
    }

    .hud {
        grid-area: hud;
    }

    .orbs {
        grid-area: orbs;
    }

    .unit {
        grid-area: unit;
    }
`;

const UI = (props: GameUIProps) => {
    return (
        <StyledUI scale={props.scale}>
            <div className="menu">
                <button onClick={() => console.log("hello")}>X</button>
            </div>
            <div className="hud" />
            <div className="orbs" />
            <div className="unit" />
        </StyledUI>
    );
};

export default connect()(UI);
