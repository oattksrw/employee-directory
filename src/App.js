import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Grid } from "semantic-ui-react";
import reducers from './reducers';
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
// import './App.css';
import UserList from "./components/UserList";
import UserCreate from "./components/UserCreate";

function App() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                    <br/>
                    <Segment>
                        <UserCreate/>
                    </Segment>
                    <UserList/>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
        </Grid>
        </Provider>
    );
}

export default App;
