import {POST_CLIENT_DATA, GET_CLIENT_DATA} from '../actions/actionTypes';

const initialState = {
  clients: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_DATA:
      return {
        ...state,
        clients: action.payload
      };
    case POST_CLIENT_DATA:
      return {
        ...state,
        clients: [action.payload, ...state.clients]
      }
    default:
      return state;
  }
}