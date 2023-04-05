import axios from 'axios';
import { auth } from "../../config"
import { flaskURL } from "../constants";



const createRisk = async (payload) => {
    try {
        const user = auth.currentRisk.uid
        const response = await axios.post(`${flaskURL}/risk/${user}`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log('RISK CREATED',response)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

const getAllRisk = async () => {
    try {
        // const user = auth.currentRisk.uid
        const user = '5hA9T00wwIYSxpnF7fzjdin87Dt2'
        const response = await axios.get(`${flaskURL}/risk/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        // console.log('RESP USER ALL::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        // console.log("ERRORRR", error)
        return { data: null, error }
    } 
};

const getOneRisk = async (date) => {
    try {
        // const user = auth.currentRisk.uid
        const user = '5hA9T00wwIYSxpnF7fzjdin87Dt2'
        const response = await axios.get(`${flaskURL}/risk/${user}/${date}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log(response.data)
        return response.data 
    } catch (error) {
        // console.log("ERRORRR", error)
        return { data: null, error }
    } 
};


const getRiskDaily = async () => {
    try {
        const user = auth.currentRisk.uid
        const response = await axios.get(`${flaskURL}/risk/daily/${user}`);
        // console.log('RESP USER::',JSON.stringify(response))
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};


const getRiskWeekly = async () => {
    
    try {
        const user = auth.currentRisk.uid
        const response = await axios.get(`${flaskURL}/risk/weekly/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log('RESP USER WEEK::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log("ERRORRR", error)
        return { data: null, error }
    } 
};

const getMonthlyRisk = async (year) => {
    
    try {
        // const user = auth.currentRisk.uid
        const user = '5hA9T00wwIYSxpnF7fzjdin87Dt2'
        const response = await axios.get(`${flaskURL}/risk/monthly/${user}/${year}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        // console.log('RESP USER MONTH::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        // console.log("ERRORRR", error)
        return { data: null, error }
    } 
};


const getDailyRisk = async (year) => {
    
    try {
        // const user = auth.currentRisk.uid
        const user = '5hA9T00wwIYSxpnF7fzjdin87Dt2'
        const response = await axios.get(`${flaskURL}/risk/daily/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log('RESP USER DAILY::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        // console.log("ERRORRR", error)
        return { data: null, error }
    } 
};

export { createRisk, getRiskDaily, getRiskWeekly, getMonthlyRisk, getAllRisk, getOneRisk, getDailyRisk }
