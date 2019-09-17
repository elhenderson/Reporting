import {GET_CLIENT_DATA} from '../actions/actionTypes';



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
      return {
        ...state,
        clientData,
        listOfClients: action.payload.listOfClients,
        totals: action.payload.ordersTotalCountObject
      };
    default:
      return state;
  }
}