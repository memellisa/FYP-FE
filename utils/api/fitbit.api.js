import { useEffect, useState } from "react";
import axios from 'axios';
import { flaskURL } from "../constants";
import { auth } from "../../config";

const postAccessToken = async (params) => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/auth/token`, {
            params: {
              authCode: params.authCode,
              uid: params.uid,
            }
        });
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const storeFitbitAccRefToken = async (payload) => {
    try {
        const response = await axios.put(`${flaskURL}/fitbit/storeToken/${auth.currentUser.uid}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
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


const getActivities = async () => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/activities/${auth.currentUser.uid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { data: JSON.parse(response.data), error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getWeeklySteps = async () => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/weeklySteps/${auth.currentUser.uid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { data: response.data.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getWeeklyAverageCalories = async (date) => {
    try {
        const response = await axios.get(`${flaskURL}/fitbit/weeklyAvgCal/${auth.currentUser.uid}/${date}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { data: response.data.sevenDayAvg, error: null }
    } catch (error) {
        return { data: null, error }
    } 
}



export { postAccessToken, getAuthURL, getActivities, getWeeklySteps, storeFitbitAccRefToken, getWeeklyAverageCalories }
