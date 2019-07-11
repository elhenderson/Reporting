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

    // const clients = clientsList.map((client, index) => (
    //   <Collapsible trigger={this.props.clientsList[index]}>
    //     <p>Total: {this.props.clientsList[index]["Total"]}</p>
    //     <p>FedEx: {this.props.clientsList[index]["FedEx"]}</p>
    //     <p>USPS: {this.props.clientsList[index]["USPS"]}</p>
    //     <p>UPS: {this.props.clientsList[index]["UPS"]}</p>
    //   </Collapsible>
    // ))
    

    //   for (i=0; i<clientsList.length; i++) {
    //     return (
    //       <Collapsible trigger={this.props.clientsList[i]}>
    //         <p>Total: {this.props.clientsList[i]["Total"]}</p>
    //         <p>FedEx: {this.props.clientsList[i]["FedEx"]}</p>
    //         <p>USPS: {this.props.clientsList[i]["USPS"]}</p>
    //         <p>UPS: {this.props.clientsList[i]["UPS"]}</p>
    //       </Collapsible>
    //     )
    //   }
    // }
    
    return (
      <div>
        {/* {clients} */}
      </div>
    )
  }
}

CountOrders.propTypes = {
  getClientData: PropTypes.func.isRequired,
  // clients: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  ["Revital U"]: state.data.revitalUData,
  ["Zilis"]: state.data.zilisData,
  clientsList: state.data.listOfClients
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountOrders);