import React from 'react';
import Collapsible from 'react-collapsible';
import './App.css';

function App() {
  return (
    <div className="App">
      <Collapsible trigger="SKU2USHIPWORKS">
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
    </div>
  );
}

export default App;
