import { useEffect, useState } from "react";
import axios from 'axios';
import { flaskURL } from "../constants";
import { auth } from "../../config";

const postAccessToken = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/auth/token`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP ACC TOKEN', response.data)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const storeFitbitAccRefToken = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/storeToken/${auth.currentUser.uid}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('STORE TOKEN RESP:: ', response.data)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getAuthURL = async (uid) => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/auth/url/${uid}`);
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
        return { data: response.data, error: null }
    } catch (error) {
        console.log('RESP PROFILE ERROR',error.response)
        return { data: null, error }
    } 
};

const getActivities = async () => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/activities/${auth.currentUser.uid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.data.ok) throw 'error' // change later
        
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getWeeklySteps = async (payload) => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/weeklySteps/${auth.currentUser.uid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { data: response.data.data, error: null }
    } catch (error) {
        console.log('RESP WEEEKLY ERROR',error.response)
        return { data: null, error }
    } 
};



export { postAccessToken, getAuthURL, getProfile, getActivities, getWeeklySteps, storeFitbitAccRefToken }
