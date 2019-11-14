import React from "react";
import {DrawerHeader} from "@material/react-drawer";
import {Body1, Overline} from "@material/react-typography";
import Button from "@material/react-button";

interface CoreNavigationHeaderProps {
    loggedIn: boolean,
    username: string | null
}

export default class CoreNavigationHeader extends React.Component<CoreNavigationHeaderProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationHeaderProps>): boolean => this.props.loggedIn != nextProps.loggedIn;

    render = () => {
        const {loggedIn, username} = this.props;
        if (loggedIn) return (
            <DrawerHeader>
                <Overline>usuario actual</Overline>
                <Body1>{{username}}</Body1>
                <Body1>Log in</Body1>
            </DrawerHeader>
        );
        else return (
            <DrawerHeader>
                <Overline>debe iniciar sesión</Overline>
                <Button raised dense>Iniciar sesion</Button>
            </DrawerHeader>
        );
    }
}