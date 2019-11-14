import React from "react";
import {DrawerHeader} from "@material/react-drawer";
import {Body1, Overline} from "@material/react-typography";
import Button from "@material/react-button";

interface CoreNavigationHeaderProps {
    loggedIn: boolean,
    username: string | null,
    onLoginClick: () => void,
    onLogoutClick: () => void
}

export default class CoreNavigationHeader extends React.Component<CoreNavigationHeaderProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationHeaderProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    render = () => {
        const {loggedIn, username, onLoginClick, onLogoutClick} = this.props;
        if (loggedIn) return (
            <DrawerHeader>
                <Overline>usuario actual</Overline>
                <Body1>{username}</Body1>
                <Button onClick={onLogoutClick} raised dense>Cerrar sesion</Button>
            </DrawerHeader>
        );
        else return (
            <DrawerHeader>
                <Overline>debe iniciar sesión</Overline>
                <Button onClick={onLoginClick} raised dense>Iniciar sesion</Button>
            </DrawerHeader>
        );
    }
}