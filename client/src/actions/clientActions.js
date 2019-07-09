import axios from 'axios';
import {POST_CLIENT_DATA, GET_CLIENT_DATA} from './actionTypes';

export const getClientData = () => dispatch => {
  axios
  .get('/api')
  .then(res =>
    // console.log(res.data[0].ordersArray[0].storeName)
    dispatch({
      type: GET_CLIENT_DATA,
      payload: res.data[0].ordersArray[0].storeName
    }) 
  )
}

export const postClientData = (data) => dispatch => {
  axios.post("/api", data)
  .then(res => 
    dispatch({
      type: POST_CLIENT_DATA,
      payload: res.data
    })
  )
}