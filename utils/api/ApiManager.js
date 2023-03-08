import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

const ApiManager = axios.create({
  baseURL: 'http://' + manifest.debuggerHost.split(":")[0] + ':8080',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;