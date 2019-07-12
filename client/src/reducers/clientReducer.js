import {POST_CLIENT_DATA, GET_CLIENT_DATA} from '../actions/actionTypes';



const initialState = {
  listOfClients: [],
  totals: {}
}

export default function(state = initialState, action) {

  switch (action.type) {
    case GET_CLIENT_DATA:
      const clientData = action.payload.listOfClients.reduce((client, key) => (
        {...client, [key]: action.payload.ordersCountObject[`${key}`]}
      ), {})
      console.log(clientData)
      return {
        ...state,
        clientData,
        listOfClients: action.payload.listOfClients,
        totals: action.payload.ordersTotalCountObject
      };
    case POST_CLIENT_DATA:
      return {
        ...state,
        clientData: [action.payload, ...state.clients]
      }
    default:
      return state;
  }
}