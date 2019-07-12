const express = require('express');
const router = express();
const Client = require('../models/Client');

const Transform = require("./transformCopy");
const fs = require("fs");

router.get('/', (req, res) => {
  Client.find()
  .then((result) => res.json(result))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {

  const orderList = fs.readFileSync(__dirname + '/1.xml', 'utf-8');

  const JSONvar = new Transform(orderList).from("xml").to("json");

  const ordersArray = JSONvar.orderList.orders

  async function countOrders() {

    const totals = {
      "All Clients Total": 0,
      "All Clients FedEx": 0,
      "All Clients UPS": 0,
      "All Clients USPS": 0,
      "All Clients Other": 0,
      "All Clients Unfulfilled": 0
    }

    const clientList =  [...new Set( await ordersArray.map(order => order.storeName))]


    console.log(clientList);
  
  
    const clientOrders = await clientList.reduce((client, key) => (
      {...client, [key]: []}
    ), {})
  
    console.log(clientOrders)
  
  
    const clientOrdersByProvider = await clientList.reduce((client, key) => (
      {...client, [key]: {
        "Total": 0,
        "FedEx": 0,
        "USPS": 0,
        "UPS": 0,
        "Other": 0,
        "Unfulfilled": 0
      }}
    ), {})
  
    console.log(clientOrdersByProvider)

    //allows use of array methods
    const entries = await Object.entries(ordersArray)

    sortByStoreName = () => {
      for (i=0; i<entries.length; i++) {
        const storeNameVar = entries[i][1].storeName
        if (entries[i][1].storeName === storeNameVar) {
          clientOrders[storeNameVar].push(entries[i][1])
        }
      }
    }

    await sortByStoreName();

    removedDuplicates = () => {
      for (var key in clientOrders) {
        clientOrders[key] =
          clientOrders[key].reduce((accumulator, order, index, array) => {
            const { list, hashList } = accumulator;
            const hash = JSON.stringify(order).replace(/\s/g, '');
          
            if (hash && !hashList.includes(hash)) {
              hashList.push(hash);
              list.push(order);
            }
          
            if (index + 1 !== array.length) {
              return accumulator;
            }  else {
              return accumulator.list;
            }
          }, { list: [], hashList: [] });
      }
    }

    await removedDuplicates();

    countProviders = () => {
      for (var key in clientOrders) {
        clientOrders[key].map((order) => {
          switch(order.provider) {
            case "FedEx":
              clientOrdersByProvider[key]["FedEx"]++
              clientOrdersByProvider[key]["Total"]++
              totals["All Clients FedEx"]++
              totals["All Clients Total"]++
              break;
            case "USPS":
              clientOrdersByProvider[key]["USPS"]++
              clientOrdersByProvider[key]["Total"]++
              totals["All Clients USPS"]++
              totals["All Clients Total"]++
              break;
            case "UPS":
              clientOrdersByProvider[key]["UPS"]++
              clientOrdersByProvider[key]["Total"]++
              totals["All Clients UPS"]++
              totals["All Clients Total"]++
              break;
            case "Other":
              if (!order.processedDate) {
                clientOrdersByProvider[key]["Unfulfilled"]++
                totals["All Clients Unfulfilled"]++
                break;
              } else {
                clientOrdersByProvider[key]["Other"]++
                clientOrdersByProvider[key]["Total"]++
                totals["All Clients Other"]++
                totals["All Clients Total"]++
                break;
              }
            case "Best Rate":
              if (!order.processedDate) {
                clientOrdersByProvider[key]["Unfulfilled"]++
                totals["All Clients Unfulfilled"]++
                break;
              } else {
                clientOrdersByProvider[key]["Unfulfilled"]++
                totals["All Clients Unfulfilled"]++
                break;
              }
            default:
              clientOrdersByProvider[key]["Unfulfilled"]++
              totals["All Clients Unfulfilled"]++
              break;
          }
        })
      }
    }

    countProviders();


    

    //new server instance would be more accurate?
    const newClient = await new Client({
      ordersObject: clientOrders,
      ordersCountObject: clientOrdersByProvider,
      ordersTotalCountObject: totals,
      listOfClients: clientList
    })
    
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;