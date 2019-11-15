import React from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Apartment, AttachMoney, Book, Face, Person} from "@material-ui/icons";

type CoreNavigationContentProps = { loggedIn: boolean };

export default class CoreNavigationContent extends React.Component<CoreNavigationContentProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationContentProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    render = () => {
        if (!this.props.loggedIn) return null;
        return (
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
        );
    }
}
