import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import {getClientData, postClientData} from '../../actions/clientActions';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import {VictoryBar, VictoryAxis, VictoryChart, VictoryTheme} from 'victory';

const Report = props => {
  const [orderNumber, setOrderNumber] = useState("");
  const [company, setCompany] = useState("Lowes");
  const [carrier, setCarrier] = useState("USPS");
  const [processed, setProcessed] = useState(false);


  // componentDidMount() {
  //   this.props.getClientData()
  // }
  useEffect(() => {
    props.getClientData()
  }, [])

    if (!props.clientsList) return null

    const clients = props.clientsList.map((client, index) => {
      
      // <Collapsible trigger={this.props.clientsList[index]} key={client}>
      //   <p>Total: {this.props.clientData[`${client}`]["Total"]}</p>
      //   <p>FedEx: {this.props.clientData[`${client}`]["FedEx"]}</p>
      //   <p>USPS: {this.props.clientData[`${client}`]["USPS"]}</p>
      //   <p>UPS: {this.props.clientData[`${client}`]["UPS"]}</p>
      //   <p>Other: {this.props.clientData[`${client}`]["Other"]}</p>
      //   <p>Unfulfilled: {this.props.clientData[`${client}`]["Unfulfilled"]}</p>
      // </Collapsible>
      const data = [
        {quarter: 1, earnings: props.clientData[`${client}`]["Total"]},
        {quarter: 2, earnings: props.clientData[`${client}`]["FedEx"]},
        {quarter: 3, earnings: props.clientData[`${client}`]["USPS"]},
        {quarter: 4, earnings: props.clientData[`${client}`]["UPS"]},
        {quarter: 5, earnings: props.clientData[`${client}`]["Unfulfilled"]}
      ];
      let color = "";

      if (props.clientsList[index] === "Lowes") {
        color = "midnightBlue"
      } else if (props.clientsList[index] === "Walmart") {
        color = "#f47321"	
      } else if (props.clientsList[index] === "Amazon") {
        color = "#ff9900"
      }
      return (
        <div style={{width: "500px", height: "500px"}} key={props.clientsList[index]}>
            <h2 style={{textAlign:"center"}}>{props.clientsList[index]}</h2>
            <VictoryChart domainPadding={10}>
              <VictoryAxis
                tickValues={["Total", "FedEx", "USPS", "UPS", "Unfulfilled"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryBar
              style={{ data: { fill: color } }}
                data={data}
                x={"quarter"}
                y={"earnings"}
              />
            </VictoryChart>

        </div>

      )

      

      
    })

    const totalData = [
      {quarter: 1, earnings: props.totals["All Clients Total"]},
      {quarter: 2, earnings: props.totals["All Clients FedEx"]},
      {quarter: 3, earnings: props.totals["All Clients USPS"]},
      {quarter: 4, earnings: props.totals["All Clients UPS"]},
      {quarter: 5, earnings: props.totals["All Clients Unfulfilled"]}
    ];

    const handleSubmit = (event) => {
      event.preventDefault()
      const data = {
        orderNumber,
        company,
        provider: carrier,
        processedDate: processed ? "2019-07-19T15:14:43.123Z" : ""
      }
      props.postClientData(data)
      window.location.reload()
    }
    
    return (
      <div>
        <h1 style={{textAlign: "center", marginTop: "-150px"}}>Analytics App</h1>
        <div style={{textAlign: "center"}}>
          <h3>Add an order</h3>
          <form onSubmit={handleSubmit}>
            Order Number
            <input type="text" name="orderNumber" value={orderNumber} onChange={e => setOrderNumber(e.target.value)}/>
            <br/>
            Company
            <select value={company} onChange={e => setCompany(e.target.value)}>
              <option value="Lowes">Lowes</option>
              <option value="Walmart">Walmart</option>
              <option value="Amazon">Amazon</option>
            </select>
            <br/>
            Carrier
            <select name="carrier" value={carrier} onChange={e => setCarrier(e.target.value)}>
              <option value="USPS">USPS</option>
              <option value="FedEx">FedEx</option>
              <option value="UPS">UPS</option>
            </select>
            <br />
            Processed? <input type="checkbox" name="processed" value={processed} onChange={e => setProcessed(!processed)}/>
            <br />
            <button type="submit" >Submit</button>
          </form>
        </div>
        
        {/* <DatePicker
          onSelect={() => this.handleSelect(this.state.startDate)} //when day is clicked
          onChange={this.handleChange} //only when value has changed
          dateFormat="MMMM dd yyyy"
          selected = {this.state.startDate}
        />
        <Collapsible trigger="Totals" >
          <p>Total: {this.props.totals["All Clients Total"]}</p>
          <p>FedEx: {this.props.totals["All Clients FedEx"]}</p>
          <p>USPS: {this.props.totals["All Clients USPS"]}</p>
          <p>UPS: {this.props.totals["All Clients UPS"]}</p>
          <p>Other: {this.props.totals["All Clients Other"]}</p>
          <p>Unfulfilled: {this.props.totals["All Clients Unfulfilled"]}</p>
        </Collapsible> */}
        <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{width: "500px", height: "500px"}}>
            <h2 style={{textAlign:"center"}}>Total</h2>
            <VictoryChart domainPadding={10}>
              <VictoryAxis
                tickValues={["Total", "FedEx", "USPS", "UPS", "Unfulfilled"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat={(x) => (`$${x / 1000}k`)}
              />
              <VictoryBar
                style={{ data: { fill: "#6DB65B" } }}
                data={totalData}
                x={"quarter"}
                y={"earnings"}
              />
            </VictoryChart>
          </div>
        </div>
        
        <div style={{display: "flex", justifyContent: "center"}}>
          {clients}
        </div>
      </div>
    )
}

Report.propTypes = {
  getClientData: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  clientData: state.data.clientData,
  clientsList: state.data.listOfClients,
  totals: state.data.totals
})

const mapDispatchToProps = dispatch => {
  return {
    getClientData: () => dispatch(getClientData()),
    postClientData: (formData) => dispatch(postClientData(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);