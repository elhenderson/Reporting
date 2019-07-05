const Transform = require("../functions/transformCopy");
const fs = require("fs");

let clientArray = []

const orderList = fs.readFileSync(__dirname + '/Nerium201804.xml', 'utf-8');

const JSONvar = new Transform(orderList).from("xml").to("json");
  
const ordersArray = JSONvar.orderList.orders


let orders = [];

const countArray = (ordersArrayArg) => {
  

  for (let i = 0; i < ordersArrayArg.length; i++) {
    if (ordersArrayArg[i].channelOrderID) {
      if (!orders.includes(ordersArrayArg[i].channelOrderID)) {
        orders.push(ordersArrayArg[i].channelOrderID)
      }
    } else {
      if (!orders.includes(ordersArrayArg[i].orderNumber)) {
        orders.push(ordersArrayArg[i].orderNumber)
      }
    }
  }
  console.log(orders.length)
  return orders.length
}

countArray(ordersArray);

// module.exports = countArray(ordersArray);