import React from 'react';
import './main.global.scss';
import {AppComponent} from "./shared/AppComponent";
import {store, persistor} from "./redux/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
export function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppComponent/>
            </PersistGate>

        </Provider>
    );
}

