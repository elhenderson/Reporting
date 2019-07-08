import axios from 'axios';
import {POST_CLIENT_DATA, GET_CLIENT_DATA} from './actionTypes';

export const getClientData = () => dispatch => {
  axios
  .get('/api')
  .then(res => 

    dispatch({
      type: GET_CLIENT_DATA,
      payload: res.data
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