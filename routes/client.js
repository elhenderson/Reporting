const express = require('express');
const router = express();
const moment = require('moment');
const Client = require('../models/Client');
const fs = require("fs");

router.get('/', (req, res) => {
  Client.find({"_id": "July 15th 2019 endOfDay"})
  .then((result) => res.json(result))
  .catch(err => console.log(err))
})

router.post('/', async (req, res) => {

  const client2 = fs.readFileSync(__dirname + '/jsonTest.json', 'utf-8');

  const client1 = fs.readFileSync(__dirname + '/July 15th 2019 Neora.json', 'utf-8');

  const orderFile = client1.concat(client2);

  // fileArray.push(JSON.parse(orderFile));

  // console.log(orderFile);


  try {
    const ordersArray = JSON.parse(client1);


    const totals = {
      "All Clients Total": 0,
      "All Clients FedEx": 0,
      "All Clients UPS": 0,
      "All Clients USPS": 0,
      "All Clients Other": 0,
      "All Clients Unfulfilled": 0
    }

    const clientOrdersByProvider = {}

    const clientOrders = {}

    for (const order of ordersArray) {
      clientOrdersByProvider[order.storeName] = {        
      "Total": 0,
      "FedEx": 0,
      "USPS": 0,
      "UPS": 0,
      "Other": 0,
      "Unfulfilled": 0}

      clientOrders[order.storeName] = {}
    }

    for (var order of ordersArray) {
      const clientName = order.storeName
      clientOrders[clientName][order.orderNumber] = order
      switch(order.provider) {
        case "FedEx":
          clientOrdersByProvider[clientName]["FedEx"]++
          clientOrdersByProvider[clientName]["Total"]++
          totals["All Clients FedEx"]++
          totals["All Clients Total"]++
          break;
        case "USPS":
          clientOrdersByProvider[clientName]["USPS"]++
          clientOrdersByProvider[clientName]["Total"]++
          totals["All Clients USPS"]++
          totals["All Clients Total"]++
          break;
        case "UPS":
          clientOrdersByProvider[clientName]["UPS"]++
          clientOrdersByProvider[clientName]["Total"]++
          totals["All Clients UPS"]++
          totals["All Clients Total"]++
          break;
        case "Other":
          if (!order.processedDate) {
            clientOrdersByProvider[clientName]["Unfulfilled"]++
            totals["All Clients Unfulfilled"]++
            break;
          } else {
            clientOrdersByProvider[clientName]["Other"]++
            clientOrdersByProvider[clientName]["Total"]++
            totals["All Clients Other"]++
            totals["All Clients Total"]++
            break;
          }
        case "Best Rate":
          if (!order.processedDate) {
            clientOrdersByProvider[clientName]["Unfulfilled"]++
            totals["All Clients Unfulfilled"]++
            break;
          } else {
            clientOrdersByProvider[clientName]["Unfulfilled"]++
            totals["All Clients Unfulfilled"]++
            break;
          }
        default:
          clientOrdersByProvider[clientName]["Unfulfilled"]++
          totals["All Clients Unfulfilled"]++
          break;
      }
    }

    // console.log(clientOrders)



    const timeOfDay = moment().format('H');

    const reportTimeStamp = timeOfDay < 17 ? `${moment().format('MMMM Do YYYY')} startOfDay` : `${moment().format('MMMM Do YYYY')} endOfDay`
    

    // new server instance would be more accurate?
    const newClient = new Client({
      "_id": reportTimeStamp,
      ordersObject: clientOrders,
      ordersCountObject: clientOrdersByProvider,
      ordersTotalCountObject: totals,
      listOfClients: Object.keys(clientOrdersByProvider)
    })
    
  
    const result = await newClient.save()
    res.json(result) 

  } catch (error) {
    return res.json({message: error.message})
  }

  

  // console.log(ordersArray)

  // console.log(ordersArray)

  
})

module.exports = router;