import React from 'react';
import './App.scss';
import {BrowserRouter} from 'react-router-dom'
import CoreRouter from "./components/core/CoreRouter";
import CoreNavigationDrawer from "./components/core/CoreNavigationDrawer";
import CoreAppBar from "./components/core/CoreAppBar";

export default class App extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <div className="App">
                    <CoreNavigationDrawer/>
                    <main className={"content"}>
                        <CoreAppBar/>
                        <CoreRouter/>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}
