import React from 'react';
import {Provider} from 'react-redux';
import './App.css';
import CountOrders from './components/CountOrders'

import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
        <CountOrders />
      </div>
    </Provider>
    
  );
}

export default App;
