import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';

const flaskURL = 'http://10.70.95.64:5000'

const postAccessToken = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/fitbit/auth/token`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        // ApiManagerFitbit('/fitbit/auth/token', { method: 'GET' }, payload);
        console.log('RESP',response)
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
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        console.log('RESP',error.response)
        return { data: null, error }
    } 
};


export { postAccessToken, getAuthURL, getProfile }
