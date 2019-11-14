import React from "react";
import List, {ListItem, ListItemText} from "@material/react-list";

interface CoreNavigationContentProps {
    loggedIn: boolean
}

export default class CoreNavigationContent extends React.Component<CoreNavigationContentProps> {
    shouldComponentUpdate = (nextProps: Readonly<CoreNavigationContentProps>): boolean => this.props.loggedIn != nextProps.loggedIn;

    render = () => {
        if (!this.props.loggedIn) return (
            <List>
                <ListItem>
                    <ListItemText primaryText='Photos'/>
                </ListItem>
                <ListItem>
                    <ListItemText primaryText='Recipes'/>
                </ListItem>
                <ListItem>
                    <ListItemText primaryText='Work'/>
                </ListItem>
            </List>
        );
        else return null;
    }
}