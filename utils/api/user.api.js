import axios from 'axios';
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
        return { data: response.data, error: null }
    } catch (error) {
        
        return { data: null, error }
    } 
};


const getUser = async () => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/user/${user}`);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getUserByUID = async (uid) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/user/${uid}`);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const putUserInfo = async (data) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.put(`${flaskURL}/user/info/${user}`, data);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const putUserHealth = async (data) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.put(`${flaskURL}/user/health/${user}`, data);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

export { createUser, getUser, putUserInfo, putUserHealth, getUserByUID }
