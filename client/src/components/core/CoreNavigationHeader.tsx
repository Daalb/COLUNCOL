import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {APILogout} from "../../config/API";
import {PureButton, PureTypography} from "../pure";

type CoreNavigationHeaderProps = {
    logged: boolean,
    username: string,
    onLogout: () => void
}

export default class CoreNavigationHeader extends React.Component<CoreNavigationHeaderProps> {
    shouldComponentUpdate = (nextProps: any): boolean => this.props.logged !== nextProps.logged;

    logoutClick = () => {
        this.props.onLogout();
        APILogout();
    };

    render = () => {
        const {logged, username} = this.props;
        if (logged) return (
            <Fragment>
                <PureTypography className={"header-username"} variant={"h6"}>{username}</PureTypography>
                <PureButton component={Link} color={"secondary"} onClick={this.logoutClick} to={"/"}>
                    cerrar sesion
                </PureButton>
            </Fragment>
        );
        return <PureButton component={Link} color={"primary"} to={"/login"}>iniciar sesion</PureButton>;
    }
};
