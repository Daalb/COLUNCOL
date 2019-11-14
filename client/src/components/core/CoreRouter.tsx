import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../../pages/HomePage";

export default class CoreRouter extends React.PureComponent {
    render = () => {
        return (
            <Switch>
                <Route path={"/"} component={HomePage}/>
            </Switch>
        );
    }
}