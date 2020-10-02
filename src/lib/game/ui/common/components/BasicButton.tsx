import React, { useMemo } from "react";
import classNames from "classnames";

/**
 */
export interface BasicButtonProps {
    enabled: boolean;
}

/**
 */
export const BasicButton: React.FC<BasicButtonProps> = props => {
    const cls = useMemo(() => {
        return classNames("button", "basic", { disabled: !props.enabled });
    }, [props.enabled]);

    return <div className={cls}>{props.children}</div>;
};

BasicButton.defaultProps = {
    enabled: true,
};
