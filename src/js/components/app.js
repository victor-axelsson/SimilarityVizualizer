import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MyApp from '../core/reducers'
import Bar from './header/bar'
import Footer from './footer/footer'
import { getRoute } from './router'
import { CONSTANTS } from '../core/constants'
import { ENV } from 'core/env'
import { getData } from '../core/persistentStorage'

const store = createStore(MyApp);
if (!ENV.DEV) {
    console.log = function() {};
}

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
            this._onChange();
        });
    }

    _onChange() {
        this.setState(this._getInitialState());
    }

    _getInitialState() {
        let storeState = store.getState();
        return {}; 
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    componentDidMount() {}

    render() {
       
        let body = (
            <div style={ { height: '100%', display: 'flex', overflow: 'hidden' } }>
                { getRoute(store.getState().navigation.route) }
            </div>
        );

        return (
            <Provider store={ store }>
                <div style={{ height: '100%' }} >
                    <div id={ 'header' }>
                        <Bar />
                    </div>
                    <div id="container"
                        style={ {  paddingTop: 100 } }>
                        { body }
                    </div>
                </div>
            </Provider>
        );
    }
}
