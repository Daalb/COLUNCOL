import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";

const LazyHomePage = Loadable({
    loader: () => import("../../pages/HomePage"),
    loading: () => <h1>Loading...</h1>
});

const LazyNotFound = Loadable({
    loader: () => import("../../pages/NotFoundPage"),
    loading: () => <h1>Loading...</h1>
});

export default class CoreRouter extends React.PureComponent {
    render = () => {
        return (
            <Switch>
                <Route path={"/"} component={LazyHomePage}/>
                <Route component={LazyNotFound}/>
            </Switch>
        );
    }
}