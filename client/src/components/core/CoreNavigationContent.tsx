import React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Apartment, Book, Home, Person, School} from "@material-ui/icons";
import {Link} from "react-router-dom";

type CoreNavigationContentProps = { logged: boolean, isAdmin: boolean };

export default class CoreNavigationContent extends React.Component<CoreNavigationContentProps> {
    shouldComponentUpdate = (nextProps: any): boolean => this.props.logged !== nextProps.logged;

    render = () => {
        if (!this.props.logged)
            return (
                <List>
                    <ListItem component={Link} to={"/"} button>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary={"Inicio"}/>
                    </ListItem>
                </List>
            );
        if (this.props.isAdmin) return (
            <List>
                <ListItem component={Link} to={"/"} button>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary={"Inicio"}/>
                </ListItem>
                <ListItem component={Link} to={"/study-plan"} button>
                    <ListItemIcon><Book/></ListItemIcon>
                    <ListItemText primary={"P. estudio"}/>
                </ListItem>
                <ListItem component={Link} to={"/schools"} button>
                    <ListItemIcon><School/></ListItemIcon>
                    <ListItemText primary={"Instituciones"}/>
                </ListItem>
            </List>
        );
        return (
            <List>
                <ListItem component={Link} to={"/"} button>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary={"Inicio"}/>
                </ListItem>
                <ListItem component={Link} to={"/p-resources"} button>
                    <ListItemIcon><Apartment/></ListItemIcon>
                    <ListItemText primary={"R. fisicos"}/>
                </ListItem>
                <ListItem component={Link} to={"/h-resources"} button>
                    <ListItemIcon><Person/></ListItemIcon>
                    <ListItemText primary={"R. humanos"}/>
                </ListItem>
            </List>
        );
    }
}
