// MIGHT NOT USE

import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

const ApiManagerFitbit = axios.create({
  headers : {
        'Content-Type': 'application/json'
  },
  baseURL: 'http://' + manifest.debuggerHost.split(":")[0] + ':5000',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManagerFitbit;