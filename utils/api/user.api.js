import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';

const flaskURL = 'http://10.70.95.64:8080'

// const postAccessToken = async (payload) => {
//     try {
//         const response = await axios.post(`${flaskURL}/user`, payload, {
//             headers: {
//             'Content-Type': 'application/json'
//             }
//         });
//         // ApiManagerFitbit('/fitbit/auth/token', { method: 'GET' }, payload);
//         console.log('RESP',response)
//         return { data: response.data, error: null }
//     } catch (error) {
//         // console.log(payload)
//         // console.log('RESP',error.response)
//         return { data: null, error }
//     } 
// };

const getUser = async () => {
    try {
        const response = await axios.get(`${flaskURL}/user`);
        // console.log('RESP USER::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const editUser = async () => {
    try {
        const response = await axios.put(`${flaskURL}/user`);
        // console.log('RESP USER::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

// const getProfile = async (payload) => {
//     try {
//         const response = await axios.post(`${flaskURL}/fitbit/user`, payload, {
//             headers: {
//             'Content-Type': 'application/json'
//             }
//         });
//         // console.log('RESP',response)
//         return { data: response.data, error: null }
//     } catch (error) {
//         console.log('RESP',error.response)
//         return { data: null, error }
//     } 
// };

// const getActivities = async (payload) => {
//     try {
//         const response = await axios.post(`${flaskURL}/fitbit/activities`, payload, {
//             headers: {
//             'Content-Type': 'application/json'
//             }
//         });
//         // console.log('RESP',response)
//         return { data: response.data, error: null }
//     } catch (error) {
//         console.log('RESP',error.response)
//         return { data: null, error }
//     } 
// };

// const getWeeklySteps = async (payload) => {
//     try {
//         const response = await axios.post(`${flaskURL}/fitbit/weeklySteps`, payload, {
//             headers: {
//             'Content-Type': 'application/json'
//             }
//         });
//         // console.log('RESP',response.data)
//         return { data: response.data.data, error: null }
//     } catch (error) {
//         console.log('RESP',error.response)
//         return { data: null, error }
//     } 
// };



export { getUser }
