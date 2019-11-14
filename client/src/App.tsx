import React from 'react';
import './App.scss';
import Button from '@material/react-button'

export default class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <Button>Hola Mundo!</Button>
            </div>
        );
    }
}
