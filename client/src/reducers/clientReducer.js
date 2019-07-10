import {POST_CLIENT_DATA, GET_CLIENT_DATA} from '../actions/actionTypes';

const initialState = {
  clientData: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_DATA:
      return {
        ...state,
        clientData: action.payload
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