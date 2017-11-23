import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import OfferPerformance from './components/offerPerformance';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/createPalette'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {blue, amber, red} from 'material-ui/colors';


const muiTheme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        accent: amber,
        error: red,
        type: 'light'
    })
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={muiTheme}>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Switch>
                                <Route path='/' exact component={OfferPerformance} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
