import React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Apartment, AttachMoney, Book, Face, Home, Person, School} from "@material-ui/icons";
import {Link} from "react-router-dom";

type CoreNavigationContentProps = { logged: boolean };

export default class CoreNavigationContent extends React.Component<CoreNavigationContentProps> {
    shouldComponentUpdate = (nextProps: any): boolean => this.props.logged !== nextProps.logged;

    render = () => {
        if (this.props.logged) return (
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
        );
        return (
            <List>
                <ListItem component={Link} to={"/"} button>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary={"Inicio"}/>
                </ListItem>
            </List>
        );
    }
}
