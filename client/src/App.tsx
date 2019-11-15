import React from 'react';
import './App.scss';
import {createStore} from "redux";
import reducers from "./config/reducers";
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import CoreNavigationDrawer from "./components/core/CoreNavigationDrawer";
import CoreRouter from "./components/core/CoreRouter";
import CoreAppBar from "./components/core/CoreAppBar";

const store = createStore(reducers);

export default class App extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="App">
                        <CoreNavigationDrawer/>
                        <main className={"content"}>
                            <CoreAppBar/>
                            <CoreRouter/>
                        </main>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}
