import React from "react";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Apartment, AttachMoney, Book, Face, Person} from '@material-ui/icons';
import CoreNavigationHeader from "./CoreNavigationHeader";
import {connect} from "react-redux";
import {loginAction, logoutAction} from "../../config/authReducer";

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
        const {loggedIn, username} = this.props;
        return (
            <Drawer variant={"permanent"} anchor={"left"} className={"drawer"} classes={{paper: "paper"}}>
                <CoreNavigationHeader loggedIn={loggedIn!!} username={username!!} loginClick={this.loginClick}
                                      logoutClick={this.logoutClick}/>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon><Person/></ListItemIcon>
                        <ListItemText primary={"Profesores"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Face/></ListItemIcon>
                        <ListItemText primary={"Estudiantes"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Book/></ListItemIcon>
                        <ListItemText primary={"Asignaturas"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AttachMoney/></ListItemIcon>
                        <ListItemText primary={"Finanzas"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Apartment/></ListItemIcon>
                        <ListItemText primary={"R. Físicos"}/>
                    </ListItem>
                </List>
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