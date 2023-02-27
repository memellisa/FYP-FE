// MIGHT NOT USE

import axios from 'axios';

const ApiManagerFitbit = axios.create({
  headers : {
        'Content-Type': 'application/json'
  },
  baseURL: 'http://10.70.95.64:5000',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerFitbit;