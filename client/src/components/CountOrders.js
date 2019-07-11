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

    // console.log(this.props.revitalUCount)
    console.log(this.props.clientsList)

    const clients = this.props.clientsList.map((client, index) => (
      
      <Collapsible trigger={this.props.clientsList[index]} key={client}>
        {/* {console.log(this.props[`${client}`]["Total"])} */}
        <p>Total: {this.props[`${client}`]["Total"]}</p>
        <p>FedEx: {this.props[`${client}`]["FedEx"]}</p>
        <p>USPS: {this.props[`${client}`]["USPS"]}</p>
        <p>UPS: {this.props[`${client}`]["UPS"]}</p>
      </Collapsible>
    ))

    console.log(clients)
    
    return (
      <div>
        {clients}
      </div>
    )
  }
}

CountOrders.propTypes = {
  getClientData: PropTypes.func.isRequired,
  // clients: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  "Revital U": state.data.revitalUData,
  "Zilis": state.data.zilisData,
  clientsList: state.data.listOfClients
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountOrders);