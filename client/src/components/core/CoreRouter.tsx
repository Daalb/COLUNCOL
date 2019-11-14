import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import LinearProgress from "@material/react-linear-progress";

const LazyHomePage = Loadable({
    loader: () => import("../../pages/HomePage"),
    loading: () => <LinearProgress indeterminate/>
});
const LazyNotFound = Loadable({
    loader: () => import("../../pages/NotFoundPage"),
    loading: () => <LinearProgress indeterminate/>
});

export default class CoreRouter extends React.PureComponent {
    render = () => {
        return (
            <Switch>
                <Route exact path={"/"} component={LazyHomePage}/>
                <Route component={LazyNotFound}/>
            </Switch>
        );
    }
}
