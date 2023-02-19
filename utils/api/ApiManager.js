import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://10.70.95.64:8080',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;