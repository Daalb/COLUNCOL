import React from "react";
import {Divider, Drawer} from "@material-ui/core";
import CoreNavigationHeader from "./CoreNavigationHeader";
import CoreNavigationContent from "./CoreNavigationContent";
import {inject, observer} from "mobx-react";
import {WithStore} from "../../config/store"

@inject("store")
@observer
export default class CoreNavigationDrawer extends WithStore {
    shouldComponentUpdate = (nextProps: {}): boolean => this.store(nextProps).auth.logged !== this.store().auth.logged;

    render = () => {
        const store = this.store();
        const {logged, username} = store.auth;
        const {logout} = store;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader onLogout={logout} loggedIn={logged} username={username}/>
                <Divider/>
                <CoreNavigationContent loggedIn={logged}/>
            </Drawer>
        );
    }
}
