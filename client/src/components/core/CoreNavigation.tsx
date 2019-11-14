import React, {Fragment} from 'react';
import Drawer, {DrawerAppContent} from "@material/react-drawer";
import {TopAppBarFixedAdjust} from "@material/react-top-app-bar";
import {connect} from "react-redux";
import CoreNavigationHeader from "./CoreNavigationHeader";
import CoreNavigationContent from "./CoreNavigationContent";
import CoreTopAppBar from "./CoreTopAppBar";

interface CoreNavigationProps {
    loggedIn: boolean,
    username: string | null
}

interface CoreNavigationState {
    open: boolean
}

class CoreNavigation extends React.PureComponent<CoreNavigationProps, CoreNavigationState> {
    constructor(props: CoreNavigationProps) {
        super(props);
        this.state = {open: false};
    }

    switchDrawer = () => this.setState({open: !this.state.open});

    render = () => {
        const {children, loggedIn, username} = this.props;
        const {open} = this.state;
        return (
            <Fragment>
                <Drawer modal open={open} onClose={this.switchDrawer}>
                    <CoreNavigationHeader loggedIn={loggedIn} username={username}/>
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

const mapDispatchToProps = (state: any): CoreNavigationProps => ({
    loggedIn: state.auth.loggedIn,
    username: state.auth.username
});

export default connect(mapDispatchToProps)(CoreNavigation);
