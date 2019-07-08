const express = require('express');
const router = express();
const Client = require('../models/Client');

const Transform = require("./transformCopy");
const fs = require("fs");


router.get('/', (req, res) => {
  Client.find()
  .then((result) => (res.json(result)))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {

  const orderList = fs.readFileSync(__dirname + '/Cerulean092018.xml', 'utf-8');

  const JSONvar = new Transform(orderList).from("xml").to("json");

  const ordersArray = JSONvar.orderList.orders

  let orders = [];

  async function countOrders() {
    for (let i = 0; i < ordersArray.length; i++) {
      if (ordersArray[i].channelOrderID) {
        if (!orders.includes(ordersArray[i].channelOrderID)) {
          orders.push(ordersArray[i].channelOrderID)
        }
      }
    }
    console.log(orders.length);

    const newClient = await new Client({
      totalCount: orders.length
    })
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;