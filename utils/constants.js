import Constants from 'expo-constants';

const { manifest } = Constants;
export const flaskURL = 'http://' + manifest.debuggerHost.split(":")[0] + ':8080'