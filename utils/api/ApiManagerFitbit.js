import axios from 'axios';

const ApiManagerFitbit = axios.create({
  headers : {
        'Content-Type': 'application/json'
  },
  baseURL: 'http://192.168.50.109:5000',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerFitbit;