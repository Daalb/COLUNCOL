import React from "react";
import List, {ListItem, ListItemGraphic, ListItemText} from "@material/react-list";
import MaterialIcon from "@material/react-material-icon";

interface CoreNavigationContentProps {
    loggedIn: boolean
}

export default class CoreNavigationContent extends React.Component<CoreNavigationContentProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationContentProps>): boolean => this.props.loggedIn !== nextProps.loggedIn;

    render = () => {
        if (this.props.loggedIn) return (
            <List>
                <ListItem>
                    <ListItemGraphic graphic={<MaterialIcon icon={"person"}/>}/>
                    <ListItemText primaryText={"Profesores"}/>
                </ListItem>
                <ListItem>
                    <ListItemGraphic graphic={<MaterialIcon icon={"face"}/>}/>
                    <ListItemText primaryText={"Estudiantes"}/>
                </ListItem>
                <ListItem>
                    <ListItemGraphic graphic={<MaterialIcon icon={"book"}/>}/>
                    <ListItemText primaryText={"Planes de estudio"}/>
                </ListItem>
                <ListItem>
                    <ListItemGraphic graphic={<MaterialIcon icon={"apartment"}/>}/>
                    <ListItemText primaryText={"Planta física"}/>
                </ListItem>
                <ListItem>
                    <ListItemGraphic graphic={<MaterialIcon icon={"attach_money"}/>}/>
                    <ListItemText primaryText={"Finanzas"}/>
                </ListItem>
            </List>
        );
        else return null;
    }
}