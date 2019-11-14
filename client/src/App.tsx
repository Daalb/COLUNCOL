import React from 'react';
import './App.scss';
import CoreNavigation from "./components/core/CoreNavigation";
import {createStore} from "redux";
import reducers from "./config/reducers";
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import CoreRouter from "./components/core/CoreRouter";

const store = createStore(reducers);

export default class App extends React.Component {
    render = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <CoreNavigation>
                        <CoreRouter/>
                    </CoreNavigation>
                </Provider>
            </BrowserRouter>
        );
    }
}
