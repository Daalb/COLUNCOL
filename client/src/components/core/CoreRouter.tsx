import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import {LinearProgress} from "@material-ui/core";

const LazyHomePage = Loadable({
    loader: () => import("../../pages/HomePage"),
    loading: () => <LinearProgress/>
});
const LazyNotFoundPage = Loadable({
    loader: () => import("../../pages/NotFoundPage"),
    loading: () => <LinearProgress/>
});
const LazyLoginPage = Loadable({
    loader: () => import("../../pages/LoginPage"),
    loading: () => <LinearProgress/>
});
const LazyStudyPlanPage = Loadable({
    loader: () => import("../../pages/StudyPlanPage"),
    loading: () => <LinearProgress/>
});

export default class CoreRouter extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Switch>
                <Route exact path={"/"} component={LazyHomePage}/>
                <Route path={"/login"} component={LazyLoginPage}/>
                <Route path={"/study-plan"} component={LazyStudyPlanPage}/>
                <Route component={LazyNotFoundPage}/>
            </Switch>
        );
    }
}
