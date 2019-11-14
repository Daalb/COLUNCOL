import React, {Fragment} from 'react';
import Drawer, {DrawerAppContent} from "@material/react-drawer";
import {TopAppBarFixedAdjust} from "@material/react-top-app-bar";
import {connect} from "react-redux";
import CoreNavigationHeader from "./CoreNavigationHeader";
import CoreNavigationContent from "./CoreNavigationContent";
import CoreTopAppBar from "./CoreTopAppBar";
import {loginAction, logoutAction} from "../../config/authReducer";

interface CoreNavigationProps {
    loggedIn: boolean,
    username: string | null,
    login: () => void,
    logout: () => void
}

interface CoreNavigationState {
    open: boolean
}

class CoreNavigation extends React.Component<CoreNavigationProps, CoreNavigationState> {
    constructor(props: CoreNavigationProps) {
        super(props);
        this.state = {open: false};
    }

    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationProps>, nextState: Readonly<CoreNavigationState>, nextContext: any): boolean => {
        return this.props.loggedIn !== nextProps.loggedIn || this.state.open !== nextState.open;
    };

    switchDrawer = () => this.setState({open: !this.state.open});

    login = () => {
        this.props.login();
    };

    logout = () => {
        this.props.logout();
    };

    render = () => {
        const {children, loggedIn, username} = this.props;
        const {open} = this.state;
        return (
            <Fragment>
                <Drawer modal open={open} onClose={this.switchDrawer}>
                    <CoreNavigationHeader onLoginClick={this.login} onLogoutClick={this.logout} loggedIn={loggedIn}
                                          username={username}/>
                    <hr className={"mdc-list-divider"}/>
                    <CoreNavigationContent loggedIn={loggedIn}/>
                </Drawer>
                <DrawerAppContent>
                    <CoreTopAppBar onHamburgerClick={this.switchDrawer}/>
                    <TopAppBarFixedAdjust>{children}</TopAppBarFixedAdjust>
                </DrawerAppContent>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loggedIn: state.auth.loggedIn,
    username: state.auth.username
});

const mapDispatchToProps = (dispatch: (v: any) => any) => ({
    login: () => dispatch(loginAction("IE Jesus Maestro")),
    logout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreNavigation);
