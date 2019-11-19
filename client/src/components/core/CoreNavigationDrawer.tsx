import React from "react";
import {Divider, Drawer} from "@material-ui/core";
import CoreNavigationHeader from "./CoreNavigationHeader";
import CoreNavigationContent from "./CoreNavigationContent";
import {WithStore} from "../../config/store"
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class CoreNavigationDrawer extends WithStore {
    render() {
        const {logout, isLogged, auth: {username}} = this.store;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader onLogout={logout} logged={isLogged} username={username}/>
                <Divider/>
                <CoreNavigationContent logged={isLogged}/>
            </Drawer>
        );
    }
}
