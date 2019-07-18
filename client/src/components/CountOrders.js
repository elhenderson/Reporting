import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {getClientData} from '../actions/clientActions';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CountOrders extends Component {
  state = {
    startDate: new Date()
  }



  componentDidMount() {
    this.props.getClientData()
  }

  // handleChange = (date) => {
  //   this.setState({startDate: date})
  // }

  // handleSelect = (date) => {
  //   this.setState({inputValue: date})
  // }
  

  render() {
    // console.log(this.props.totalCount)


    // const clients = this.props.clientData["Artifacts"]
    if (!this.props.clientsList) return null

    const clients = this.props.clientsList.map((client, index) => (
      
      <Collapsible trigger={this.props.clientsList[index]} key={client}>
        {/* {console.log(this.props[`${client}`]["Total"])} */}
        <p>Total: {this.props.clientData[`${client}`]["Total"]}</p>
        <p>FedEx: {this.props.clientData[`${client}`]["FedEx"]}</p>
        <p>USPS: {this.props.clientData[`${client}`]["USPS"]}</p>
        <p>UPS: {this.props.clientData[`${client}`]["UPS"]}</p>
        <p>Other: {this.props.clientData[`${client}`]["Other"]}</p>
        <p>Unfulfilled: {this.props.clientData[`${client}`]["Unfulfilled"]}</p>
      </Collapsible>
    ))

    // console.log(clients)
    
    return (
      <div>
        {/* <DatePicker
          selected={this.state.date}
          onSelect={this.handleSelect} //when day is clicked
          onChange={this.handleChange} //only when value has changed
        /> */}
        <Collapsible trigger="Totals" >
          <p>Total: {this.props.totals["All Clients Total"]}</p>
          <p>FedEx: {this.props.totals["All Clients FedEx"]}</p>
          <p>USPS: {this.props.totals["All Clients USPS"]}</p>
          <p>UPS: {this.props.totals["All Clients UPS"]}</p>
          <p>Other: {this.props.totals["All Clients Other"]}</p>
          <p>Unfulfilled: {this.props.totals["All Clients Unfulfilled"]}</p>
        </Collapsible>
        {clients}
      </div>
    )
  }
}

CountOrders.propTypes = {
  getClientData: PropTypes.func.isRequired,
  // clients: PropTypes.array.isRequired
}

// const 

const mapStateToProps = (state) => ({
  clientData: state.data.clientData,
  clientsList: state.data.listOfClients,
  totals: state.data.totals
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountOrders);