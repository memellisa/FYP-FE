import axios from 'axios';

const ApiManagerFitbit = axios.create({
  baseURL: 'http://10.70.95.64:5000',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerFitbit;