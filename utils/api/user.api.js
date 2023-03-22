import { useEffect, useState } from "react";
import ApiManagerFitbit from "./ApiManagerFitbit";
import axios from 'axios';
import Constants from 'expo-constants';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config"

const { manifest } = Constants;

const flaskURL = 'http://' + manifest.debuggerHost.split(":")[0] + ':8080'
const user = auth.currentUser.uid

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

// const auth = getAuth();

const getUser = async () => {
    try {
        console.log(`${flaskURL}/user/${user}`)
        const response = await axios.get(`${flaskURL}/user/${user}`);
        // console.log('RESP USER::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

// const editUser = async () => {
//     try {
//         const response = await axios.put(`${flaskURL}/user`);
//         // console.log('RESP USER::',JSON.stringify(response))
//         return { data: response.data, error: null }
//     } catch (error) {
//         return { data: null, error }
//     } 
// };

const getUserInfo = async () => {
    
    try {
        console.log(`${flaskURL}/user/info/${user}`)
        const response = await axios.get(`${flaskURL}/user/info/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log('RESP USER INFO::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log("ERRORRR", error)
        return { data: null, error }
    } 
};

const putUserInfo = async (data) => {
    try {
        const response = await axios.put(`${flaskURL}/user/info/${user}`, data);
        // console.log('EDITTED USER INFO::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getUserHealth = async () => {
    try {
        const response = await axios.get(`${flaskURL}/user/health`);
        // console.log('RESP USER HEALTH::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const putUserHealth = async (data) => {
    try {
        const response = await axios.put(`${flaskURL}/user/health/${user}`, data);
        // console.log('EDITTED USER INFO::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

export { getUser, getUserHealth, getUserInfo, putUserInfo, putUserHealth }
