
require('style/main.scss');
import * as React from 'react';

// require('component/demo.js');
// require('component/counterByRedux');
import {redux, createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import reducer from 'reducer';
import CounterPanel from "component/counter/CounterPanel";
import { Provider, connect } from 'react-redux';
import * as actionCreators from 'actions';

const store = createStore(reducer, applyMiddleware(thunk))

/* 此处写数据验证 */

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {A,B,addCounter,addIfOdd,asyncAdd,decrement,increment} = this.props;
        return (
            <div>
                <CounterPanel {...{
                    data: A,actions:{
                        addIfOdd,asyncAdd,decrement,increment
                    },addCounter,
                    panelName:'A'
                }}/>
                <CounterPanel {...{
                    data: B,actions:{
                        addIfOdd,asyncAdd,decrement,increment
                    },addCounter,
                    panelName:'B'
                }}/>
            </div>
        )
    }
}

App = connect(
    state=>state,
    dispatch => bindActionCreators(actionCreators,dispatch)
)(App);

ReactDOM.render(
    <Provider
        store={store}
    >
    <App />
    </Provider>,
    document.getElementById('root')
);

