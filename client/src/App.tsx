import React from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom'
import CoreRouter from "./components/core/CoreRouter";
import CoreNavigationDrawer from "./components/core/CoreNavigationDrawer";
import CoreAppBar from "./components/core/CoreAppBar";
import {Provider} from "mobx-react";
import {store} from "./config/store";
import {Grid} from "@material-ui/core";

export default class App extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="App">
                        <CoreNavigationDrawer/>
                        <main className={"content"}>
                            <CoreAppBar/>
                            <Grid container >
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
