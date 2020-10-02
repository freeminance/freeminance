import React from "react";
import { BasicButton, BasicButtonProps } from "../../src/lib/game/ui/common/components/BasicButton";

// @ts-expect-error
import Hamburger from "../../src/graphics/hamburger.svg";

export default { component: BasicButton, title: "GameUI/BasicButton" };

export const Text = (props: any) => <BasicButton {...props}>{props.text}</BasicButton>;
Text.args = { text: "Example" };

export const Graphic = (props: BasicButtonProps) => (
    <BasicButton {...props}>
        <Hamburger />
    </BasicButton>
);
