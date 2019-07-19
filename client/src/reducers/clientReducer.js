import {GET_REPORT_BY_DATE, GET_CLIENT_DATA, NO_REPORT} from '../actions/actionTypes';



const initialState = {
  listOfClients: [],
  totals: {}
}

export default function(state = initialState, action) {
  if (!action.payload || !action.payload.listOfClients) return new Error("Missing payload data")
  const clientData = action.payload.listOfClients.reduce((client, key) => (
    {...client, [key]: action.payload.ordersCountObject[`${key}`]}
  ), {})
  switch (action.type) {
    
    case GET_CLIENT_DATA:
      // if (!action.payload || !action.payload.listOfClients) return new Error("Missing payload data")
      // const clientData = action.payload.listOfClients.reduce((client, key) => (
      //   {...client, [key]: action.payload.ordersCountObject[`${key}`]}
      // ), {})
      return {
        ...state,
        clientData,
        listOfClients: action.payload.listOfClients,
        totals: action.payload.ordersTotalCountObject
      };
    case GET_REPORT_BY_DATE:
      // if (!action.payload || !action.payload.listOfClients) return new Error("Missing payload data")
      // const clientData = action.payload.listOfClients.reduce((client, key) => (
      //   {...client, [key]: action.payload.ordersCountObject[`${key}`]}
      // ), {})
      return {
        ...state,
        clientData,
        listOfClients: action.payload.listOfClients,
        totals: action.payload.ordersTotalCountObject
      };
    case NO_REPORT:
      return {
        ...state
      }
    default:
      return state;
  }
}