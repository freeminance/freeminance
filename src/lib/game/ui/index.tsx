import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Menu from "./menu";

interface GameUIProps {
    /**
     * rem based font scale that manages all other em sizes.
     */
    scale: number;
}

const StyledUI = styled.div<Pick<GameUIProps, "scale">>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    font-size: ${props => props.scale}rem;
    grid-template-columns: min-content auto min-content;
    grid-template-rows: 4em auto 8em;
    grid-template-areas: "top top top" "left . right" "bottom bottom bottom";
    pointer-events: none;

    .top {
        grid-area: top;
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: auto;
        grid-template-areas: "static" "floating";

        .static {
            grid-area: static;
            pointer-events: auto;
            display: grid;
            grid-template-columns: min-content auto min-content;
            grid-template-rows: auto;
            grid-template-areas: "left . right";
            align-content: center;
            background: red;

            .left {
                grid-area: left;
            }

            .right {
                grid-area: right;
                display: flex;
                align-items: center;
            }
        }

        .floating {
            grid-area: floating;
        }
    }

    .bottom {
        display: grid;
    }
`;

const UI = (props: GameUIProps) => {
    return (
        <StyledUI scale={props.scale}>
            <div className="top">
                <div className="static">
                    <div className="left">

                    </div>
                    <div className="right">
                        <Menu />
                    </div>
                </div>
                <div className="floating"></div>
            </div>
            <div className="bottom"></div>
        </StyledUI>
    );
};

export default connect()(UI);
