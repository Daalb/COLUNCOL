import React from "react";
import {Divider, Drawer} from "@material-ui/core";
import CoreNavigationHeader from "./CoreNavigationHeader";
import CoreNavigationContent from "./CoreNavigationContent";
import {inject, observer} from "mobx-react";
import store from "../../config/store";

type CoreNavigationDrawerProps = { store: typeof store };

@inject("store")
@observer
export default class CoreNavigationDrawer extends React.Component<CoreNavigationDrawerProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationDrawerProps>): boolean =>
        this.props.store.auth.logged !== nextProps.store.auth.logged;

    render = () => {
        const {logged, username} = this.props.store.auth;
        const {logout} = this.props.store;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader onLogout={logout} loggedIn={logged} username={username}/>
                <Divider/>
                <CoreNavigationContent loggedIn={logged}/>
            </Drawer>
        );
    }
}
