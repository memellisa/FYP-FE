import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';
import * as Network from 'expo-network';
import Constants from 'expo-constants';

const { manifest } = Constants;

const flaskURL = 'http://' + manifest.debuggerHost.split(":")[0] + ':8080'



const postAccessToken = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/auth/token`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        // ApiManagerFitbit('/fitbit/auth/token', { method: 'GET' }, payload);
        console.log('RESP ACC TOKEN', response.data)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const getAuthURL = async () => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/auth/url`);
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


const getProfile = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/user`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP PROFILE', response)
        return { data: response.data, error: null }
    } catch (error) {
        console.log('RESP PROFILE ERROR',error.response)
        return { data: null, error }
    } 
};

const getActivities = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/activities`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP ACTIVITIES', response.data)
        return { data: response, error: null }
    } catch (error) {
        console.log('RESP ACTIVITIES ERROR',error.response)
        return { data: null, error }
    } 
};

const getWeeklySteps = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/weeklySteps`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP WEEKKLY',response.data)
        let jsonResponse = JSON.parse(response.data)
        return { data: jsonResponse.data, error: null }
    } catch (error) {
        console.log('RESP WEEEKLY ERROR',error.response)
        return { data: null, error }
    } 
};



export { postAccessToken, getAuthURL, getProfile, getActivities, getWeeklySteps }
