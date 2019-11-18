import * as Expo from "expo";
import React, { Component } from "react";
import { StyleProvider } from "native-base";

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "../Store/Reducers";


import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }
    componentWillMount() {
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {
        
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }

        const store = createStore(combineReducers(reducers), compose(applyMiddleware(thunk)));

        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(variables)}>
                    <App />
                </StyleProvider>
            </Provider>
        );
    }
}
