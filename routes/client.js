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

  const orderList = fs.readFileSync(__dirname + '/Cerulean092018.xml', 'utf-8');

  const JSONvar = new Transform(orderList).from("xml").to("json");

  const ordersArray = JSONvar.orderList.orders

  const listOfClients = [
    "Revital U",
    "Zilis"
  ]

  const clientOrders = {
    "Revital U": [],
    "Zilis": []
  }

  const clientOrdersCount = {
    "Revital U": {
      "Total": 0,
      "FedEx": 0,
      "USPS": 0,
      "UPS": 0
    },
    "Zilis": {
      "Total": 0,
      "FedEx": 0,
      "USPS": 0,
      "UPS": 0
    }
  }


  async function countOrders() {

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
              clientOrdersCount[key]["FedEx"]++
              clientOrdersCount[key]["Total"]++
              break;
            case "USPS":
              clientOrdersCount[key]["USPS"]++
              clientOrdersCount[key]["Total"]++
              break;
            case "UPS":
              clientOrdersCount[key]["UPS"]++
              clientOrdersCount[key]["Total"]++
              break;
          }
        })
      }
    }

    countProviders();


    

    //new server instance would be more accurate?
    const newClient = await new Client({
      ordersObject: clientOrders,
      ordersCountObject: clientOrdersCount,
      listOfClients
    })
    
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;