import { useEffect, useState } from "react";
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config"
import { flaskURL } from "../constants";



const createUser = async (payload) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.post(`${flaskURL}/user/${user}`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

// const auth = getAuth();

const getUser = async () => {
    try {
        const user = auth.currentUser.uid
        // console.log(`${flaskURL}/user/${user}`)
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
        const user = auth.currentUser.uid
        // console.log(`${flaskURL}/user/info/${user}`)
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
        const user = auth.currentUser.uid
        const response = await axios.put(`${flaskURL}/user/info/${user}`, data);
        // console.log('EDITTED USER INFO::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getUserHealth = async () => {
    
    try {
        const user = auth.currentUser.uid
        // console.log(`${flaskURL}/user/health/${user}`)
        const response = await axios.get(`${flaskURL}/user/health/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log('RESP USER health::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log("ERROR getting health data", error)
        return { data: null, error }
    } 
};

const putUserHealth = async (data) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.put(`${flaskURL}/user/health/${user}`, data);
        // console.log('EDITTED USER HEALTH::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

export { createUser, getUser, getUserHealth, getUserInfo, putUserInfo, putUserHealth }
