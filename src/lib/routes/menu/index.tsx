import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setPref } from "../../store/preferences/actions";

interface MenuProps {
    setPref: (key: Parameters<typeof setPref>[0], value: Parameters<typeof setPref>[1]) => any;
};

export function Menu(props: MenuProps) {
    useEffect(() => {
        console.log("Hello There");
    }, []);

    return (
        <div>
            <h1>Main Menu</h1>
            <Link to="/menu/example">Example</Link>
            <Link to="/game">Play</Link>
            <button onClick={() => props.setPref("hello", "there")}>Click</button>
        </div>
    );
}

export default connect(null, dispatch => ({
    setPref: (key: Parameters<typeof setPref>[0], value: Parameters<typeof setPref>[1]) => dispatch(setPref(key, value)),
}))(Menu);
