import axios from 'axios';
import {GET_REPORT_BY_DATE, GET_CLIENT_DATA, NO_REPORT} from './actionTypes';

export const noReport = () => dispatch => {
  axios
  .get('/api/noReport')
  .then(res => {
    dispatch({
      type: NO_REPORT,
      payload: res.data[0]
    })
  })
}

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

export const getReportByDate = (date, reportType) => dispatch => {
  axios.get(`/api/chooseReport/${date}/${reportType}`)
  .then(res => 
    dispatch({
      type: GET_REPORT_BY_DATE,
      payload: res.data[0]
    })
  )
}
