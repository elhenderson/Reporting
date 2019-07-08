import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {getClientData} from '../actions/clientActions';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

class CountOrders extends Component {

  componentDidMount() {
    this.props.getClientData()
  }

  // componentDidUpdate() {
  //   this.updateClientCount(this.props.clients)
  // }

  getClientDataMethod() {
    this.props.getClientData()
  }

  updateClientCount(count) {
    this.props.getClientData()

    const newArray = Object.keys(count)
    .map(countKey => {
      return count[countKey]
    })
    console.log(newArray)
    return newArray
    
  }


  render() {

    // console.log(this.props.clients)
    // const fuckThis = this.props.clients
    
    return (
      <div>
        <Collapsible trigger="SKU2USHIPWORKS">
          <p>Total: </p>
          <p>FedEx: 5</p>
          <p>USPS: 11</p>
          <p>UPS: 0</p>
        </Collapsible>
      </div>
    )
  }
}

CountOrders.propTypes = {
  getClientData: PropTypes.func.isRequired,
  // clients: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  clients: state.data.clients[4]
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountOrders);