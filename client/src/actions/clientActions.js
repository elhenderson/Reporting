import axios from 'axios';
import {GET_CLIENT_DATA} from './actionTypes';

export const getClientData = () => dispatch => {
  axios
  .get('/api')
  .then(res =>
    // console.log(res.data[0])
    dispatch({
      type: GET_CLIENT_DATA,
      payload: res.data[0]
    }) 
  )
}

