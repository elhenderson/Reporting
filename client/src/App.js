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
        {/* <Collapsible trigger="SKU2USHIPWORKS">
          <p>Total: 28 Orders</p>
          <p>FedEx: 5</p>
          <p>USPS: 11</p>
          <p>UPS: 0</p>
        </Collapsible>
        <Collapsible trigger="SKU2UFEB2018">
          <p>Total: 186 Orders</p>
          <p>FedEx: 66</p>
          <p>USPS: 118</p>
          <p>UPS: 0</p>
        </Collapsible>
        <Collapsible trigger="Cerulean092018">
          <p>Total: 3463 Orders</p>
          <p>FedEx: 404</p>
          <p>USPS: 3059</p>
          <p>UPS: 0</p>
        </Collapsible>
        <Collapsible trigger="SKU2USHIPWORKS">
          <p>Total: 1475 Orders</p>
          <p>FedEx: 21</p>
          <p>USPS: 1453</p>
          <p>UPS: 0</p>
        </Collapsible>
        <button type="submit" method="POST" >POST</button> */}
      </div>
    </Provider>
    
  );
}

export default App;
