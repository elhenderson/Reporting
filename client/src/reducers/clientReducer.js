import {POST_CLIENT_DATA, GET_CLIENT_DATA} from '../actions/actionTypes';

const initialState = {
  revitalUData: [],
  zilisData: [],
  listOfClients: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_DATA:
      return {
        ...state,
        revitalUData: action.payload.ordersCountObject["Revital U"],
        zilisData: action.payload.ordersCountObject["Zilis"],
        listOfClients: action.payload.listOfClients
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