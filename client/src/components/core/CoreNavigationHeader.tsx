import React, {Fragment} from "react";
import {Button, Typography} from "@material-ui/core";

type CoreNavigationHeaderProps = {
    loggedIn: boolean,
    username: string,
    loginClick: () => void,
    logoutClick: () => void
}

export default class CoreNavigationHeader extends React.Component<CoreNavigationHeaderProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationHeaderProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    render = () => {
        const {loggedIn, username, loginClick, logoutClick} = this.props;
        if (loggedIn) return (
            <Fragment>
                <Typography variant={"h5"}>{username}</Typography>
                <Button color={"secondary"} onClick={logoutClick}>cerrar sesion</Button>
            </Fragment>
        ); else return (
            <Button color={"primary"} onClick={loginClick}>iniciar sesion</Button>
        );
    }
};