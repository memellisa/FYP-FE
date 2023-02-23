import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';
const postAccessToken = async (payload) => {
    try {
        const response = await ApiManagerFitbit('/fitbit/auth/token', { method: 'POST' }, payload);
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getAuthURL = async () => {
    try {
        // const response = await axios.get('http://127.0.01:5000/fitbit/getAuthURL');
        const response = await ApiManagerFitbit('/fitbit/auth/url', { method: 'GET' });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


const getProfile = async (payload) => {
    try {
        // const response = await axios.get('http://127.0.01:5000/fitbit/getAuthURL');
        const response = await ApiManagerFitbit('/fitbit/user', { method: 'GET' }, payload);
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


export { postAccessToken, getAuthURL, getProfile }
