import React from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom'
import CoreRouter from "./components/core/CoreRouter";
import CoreNavigationDrawer from "./components/core/CoreNavigationDrawer";
import CoreAppBar from "./components/core/CoreAppBar";
import {observer, Provider} from "mobx-react";
import {store} from "./config/store";
import {Grid, LinearProgress} from "@material-ui/core";
import {loadAreas} from "./config/API";
import {observable} from "mobx";

@observer
export default class App extends React.Component {
    @observable private loaded = false;

    componentDidMount = async () => {
        await loadAreas();
        this.loaded = true;
    };

    render() {
        if (!this.loaded) return <LinearProgress/>;
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="App">
                        <CoreNavigationDrawer/>
                        <main className={"content"}>
                            <CoreAppBar/>
                            <Grid container>
                                <Grid item xs={12}>
                                    <CoreRouter/>
                                </Grid>
                            </Grid>
                        </main>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}
