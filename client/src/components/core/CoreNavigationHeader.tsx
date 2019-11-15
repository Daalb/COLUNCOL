import React, {Fragment} from "react";
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {APILogout} from "../../config/API";

type CoreNavigationHeaderProps = {
    loggedIn: boolean,
    username: string,
    onLogout: () => void
}

export default class CoreNavigationHeader extends React.Component<CoreNavigationHeaderProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationHeaderProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    logoutClick = () => {
        this.props.onLogout();
        APILogout();
    };

    render = () => {
        const {loggedIn, username} = this.props;
        if (loggedIn) return (
            <Fragment>
                <Typography className={"header-username"} variant={"h6"}>{username}</Typography>
                <Button component={Link} color={"secondary"} onClick={this.logoutClick} to={"/"}>
                    cerrar sesion
                </Button>
            </Fragment>
        );
        return <Button component={Link} color={"primary"} to={"/login"}>iniciar sesion</Button>;
    }
};
