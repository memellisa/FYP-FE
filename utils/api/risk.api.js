import axios from 'axios';
import { auth } from "../../config"
import { flaskURL } from "../constants";

const postRisk = async (date) => {
    try {
        const user = auth.currentUser.uid
        const response = await axios.post(`${flaskURL}/risk/${user}/${date}`, {
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
        return { data: response.data, error: null }
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
        if (typeof response.data == 'string' && response.data.startsWith("An Error Occured:")) throw new Error
        return { data: response.data , error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getYearlyRisk = async (year) => {
    
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/yearly/${user}/${year}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return { data: response.data , error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


const getMonthlyRisk = async () => {
    
    try {
        const user = auth.currentUser.uid
        const response = await axios.get(`${flaskURL}/risk/monthly/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        return { data: response.data , error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

export { postRisk, getMonthlyRisk, getAllRisk, getOneRisk, getYearlyRisk }
