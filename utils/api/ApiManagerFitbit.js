import axios from 'axios';

const ApiManagerFitbit = axios.create({
  headers : {
        'Content-Type': 'application/json'
  },
  baseURL: 'http://10.68.9.184:5000',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerFitbit;