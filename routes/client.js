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

  let orders = []

  async function countOrders() {

    const entries = await Object.entries(ordersArray)


    const filteredByStoreName = await entries
    .filter((order, index) => {
      if (order[1].storeName === "Revital U") {
        return order[1]
        
      }
    })


    const removedDuplicates = await filteredByStoreName
    .reduce((accumulator, order, index, array) => {
      const { list, hashList } = accumulator;
      const hash = JSON.stringify(order[1]).replace(/\s/g, '');
    
      if (hash && !hashList.includes(hash)) {
        hashList.push(hash);
        list.push(order[1]);
      }
    
      if (index + 1 !== array.length) {
        return accumulator;
      }  else {
        return accumulator.list;
      }
    }, { list: [], hashList: [] });


    
    await orders.push(removedDuplicates);
    

    //new server instance would be more accurate?
    const newClient = await new Client({
      totalCount: orders.length,
      ordersArray: orders
    })
    
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;