import axios from 'axios';
import { auth } from "../../config"
import { flaskURL } from "../constants";



const postRisk = async (payload) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.post(`${flaskURL}/risk/${user}`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getAllRisk = async () => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return { data: null, error }
    } 
};

const getOneRisk = async (date) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/${user}/${date}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return response.data 
    } catch (error) {
        return { data: null, error }
    } 
};


const getRiskDaily = async () => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/daily/${user}`);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


const getRiskWeekly = async () => {
    
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/weekly/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return { data: null, error }
    } 
};

const getMonthlyRisk = async (year) => {
    
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/monthly/${user}/${year}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return { data: null, error }
    } 
};


const getDailyRisk = async (year) => {
    
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/daily/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return { data: null, error }
    } 
};

export { postRisk, getRiskDaily, getRiskWeekly, getMonthlyRisk, getAllRisk, getOneRisk, getDailyRisk }
