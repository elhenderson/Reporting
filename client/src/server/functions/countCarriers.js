const Transform = require("../functions/transformCopy");
const fs = require("fs");

const orderList = fs.readFileSync(__dirname + '/Nerium201804.xml', 'utf-8');

const JSONvar = new Transform(orderList).from("xml").to("json");
  
const ordersArray = JSONvar.orderList.orders

let orders = [];

let fedExCounter = 0
let UPSCounter = 0;
let USPSCounter = 0;

const countCarriers = (ordersArrayArg) => {
  for (let i = 0; i < ordersArrayArg.length; i++) {
    if (ordersArrayArg[i].channelOrderID) {
      if (!orders.includes(ordersArrayArg[i].channelOrderID)) {
        orders.push(ordersArrayArg[i].channelOrderID)
        if (ordersArrayArg[i].provider === "FedEx") {
          fedExCounter++;
        } else if (ordersArrayArg[i].provider === "USPS") {
          USPSCounter++;
        } else if (ordersArrayArg[i].provider === "UPS") {
          UPSCounter++;
        }
      }
    } else {
      if (!orders.includes(ordersArrayArg[i].orderNumber)) {
        orders.push(ordersArrayArg[i].orderNumber)
        if (ordersArrayArg[i].provider === "FedEx") {
          fedExCounter++;
        } else if (ordersArrayArg[i].provider === "USPS") {
          USPSCounter++;
        } else if (ordersArrayArg[i].provider === "UPS") {
          UPSCounter++;
        }
      }
    }
    
  }
  console.log(`FedEx: ${fedExCounter}`);
  console.log(`USPS: ${USPSCounter}`);
  console.log(`UPS: ${UPSCounter}`);
}

countCarriers(ordersArray);