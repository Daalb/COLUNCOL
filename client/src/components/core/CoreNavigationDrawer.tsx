import React from "react";
import {Divider, Drawer} from "@material-ui/core";
import CoreNavigationHeader from "./CoreNavigationHeader";
import {connect} from "react-redux";
import {loginAction, logoutAction} from "../../config/authReducer";
import CoreNavigationContent from "./CoreNavigationContent";

type ReduxProps = Partial<{
    loggedIn: boolean,
    username: string,
    onLogin: () => void,
    onLogout: () => void
}>;

type CoreNavigationDrawerProps = {} & ReduxProps;

class CoreNavigationDrawer extends React.Component<CoreNavigationDrawerProps> {
    loginClick = () => {
        const {onLogin} = this.props;
        if (onLogin) onLogin();
    };
    logoutClick = () => {
        const {onLogout} = this.props;
        if (onLogout) onLogout();
    };

    render = () => {
        const {loggedIn = false, username = ""} = this.props;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader loggedIn={loggedIn} username={username} loginClick={this.loginClick}
                                      logoutClick={this.logoutClick}/>
                <Divider/>
                <CoreNavigationContent loggedIn={loggedIn}/>
            </Drawer>
        );
    }
}

const mapStateToProps = ({auth}: any): ReduxProps => ({
    loggedIn: auth.loggedIn,
    username: auth.username
});

const mapDispatchToProps = (dispatch: (p: any) => void): ReduxProps => ({
    onLogin: () => dispatch(loginAction("IE Jesus Maestro")),
    onLogout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreNavigationDrawer);