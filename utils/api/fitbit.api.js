import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';
const postAccessToken = async (payload) => {
    try {
        const response = await axios.post('http://192.168.50.109:5000/fitbit/auth/token', payload, {
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
        const response = await axios.get('http://192.168.50.109:5000/fitbit/user', payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


export { postAccessToken, getAuthURL, getProfile }
