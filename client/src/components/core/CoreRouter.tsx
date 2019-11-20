import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import Loadable from "react-loadable";
import {LinearProgress} from "@material-ui/core";

type IRoute = {
    cname: string,
    path: string
};
const LazyRoute = (item: IRoute) => Loadable({
    loader: () => import(`../../pages/${item.cname}`),
    loading: () => <LinearProgress/>,
});
const routeBuilder = (item: IRoute) => <Route key={item.path} path={item.path} component={LazyRoute(item)}/>;
const routes: IRoute[] = [
    {cname: "LoginPage", path: "/login"},
    {cname: "StudyPlanPage", path: "/study-plan"},
    {cname: "SchoolsPage", path: "/schools"},
    {cname: "PhysicalResourcesPage", path: "/p-resources"},
    {cname: "HumaneResourcesPage", path: "/h-resources"},
];

export default class CoreRouter extends React.Component {
    shouldComponentUpdate = (): boolean => false;

    render = () => {
        return (
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                {routes.map(routeBuilder)}
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}
