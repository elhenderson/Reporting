import React from 'react';
import {Provider} from 'react-redux';
import './App.css';
import Report from './containers/Report/index'

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Report />
      </div>
    </Provider>
    
  );
}

export default App;
