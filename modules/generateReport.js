const moment = require('moment');
const Client = require('../models/Client');
const Orders = require("../models/Orders");

const generateReport = async () => {
   //find all orders for the current date
  //  const startOfDay = moment().startOf("day").format()

  //  const endOfDay = moment().endOf("day").format()
 
   try {
     const orders = await Orders.find()

 
     if (!orders || !orders.length) throw new Error("No orders were found")
 
     const totals = {
       "All Clients Total": 0,
       "All Clients FedEx": 0,
       "All Clients UPS": 0,
       "All Clients USPS": 0,
       "All Clients Unfulfilled": 0
     }
 
     const clientOrdersByProvider = {}
 
     const clientOrders = {}
 
     for (const order of orders) {
       clientOrdersByProvider[order.company] = {        
       "Total": 0,
       "FedEx": 0,
       "USPS": 0,
       "UPS": 0,
       "Unfulfilled": 0}
 
       clientOrders[order.company] = {}
     }
 
     for (var order of orders) {
       const clientName = order.company
       
       clientOrders[clientName][order.orderNumber] = order
       switch(order.provider) {
         case "FedEx":
           if (order.processedDate) {
            clientOrdersByProvider[clientName]["FedEx"]++
            clientOrdersByProvider[clientName]["Total"]++
            totals["All Clients FedEx"]++
            totals["All Clients Total"]++
           break;
           }
         case "USPS":
           if (order.processedDate) {
            clientOrdersByProvider[clientName]["USPS"]++
            clientOrdersByProvider[clientName]["Total"]++
            totals["All Clients USPS"]++
            totals["All Clients Total"]++              
           break;
           }
         case "UPS":
           if (order.processedDate) {
            clientOrdersByProvider[clientName]["UPS"]++
            clientOrdersByProvider[clientName]["Total"]++
            totals["All Clients UPS"]++
            totals["All Clients Total"]++
           break;
           }
           if (!order.processedDate) {
             clientOrdersByProvider[clientName]["Unfulfilled"]++
             totals["All Clients Unfulfilled"]++
             break;
           } else {
             clientOrdersByProvider[clientName]["Total"]++
             totals["All Clients Total"]++
             break;
           }
         default:
           clientOrdersByProvider[clientName]["Unfulfilled"]++
           totals["All Clients Unfulfilled"]++
           break;
       }
     }
 
     // console.log(clientOrders)
 
 
 
     const newClient = new Client({
       name: "report",
       ordersObject: clientOrders,
       ordersCountObject: clientOrdersByProvider,
       ordersTotalCountObject: totals,
       listOfClients: Object.keys(clientOrdersByProvider)
     })
     
   
     const result = await newClient.save()
     return result;
 
   } catch (error) {
     throw error
   }
 
   
 
   // console.log(orders)
 
   // console.log(orders)
 
}

module.exports = generateReport