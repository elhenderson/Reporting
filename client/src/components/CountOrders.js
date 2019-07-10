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


  render() {
    // console.log(this.props.totalCount)

    // console.log(this.props.storeName)

    
    return (
      <div>
        <Collapsible trigger="Revital U">
          <p>Total: {this.props.totalCount}</p>
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
  totalCount: state.data.clientData
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountOrders);