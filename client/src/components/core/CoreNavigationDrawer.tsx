import React from "react";
import {Divider, Drawer} from "@material-ui/core";
import CoreNavigationHeader from "./CoreNavigationHeader";
import {connect} from "react-redux";
import {logoutAction} from "../../config/authReducer";
import CoreNavigationContent from "./CoreNavigationContent";

type ReduxProps = Partial<{
    loggedIn: boolean,
    username: string,
    onLogout: () => void
}>;

type CoreNavigationDrawerProps = {} & ReduxProps;

class CoreNavigationDrawer extends React.Component<CoreNavigationDrawerProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationDrawerProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    render = () => {
        const {loggedIn = false, username = "", onLogout} = this.props;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader onLogout={onLogout!!} loggedIn={loggedIn} username={username}/>
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
    onLogout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreNavigationDrawer);