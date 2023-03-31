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

const getRiskMonthly = async () => {
    
    try {
        // const user = auth.currentRisk.uid
        const user = 'd3hL71yqeaTTQta44Wcw3vZFvOp2'
        const response = await axios.get(`${flaskURL}/risk/monthly/${user}`,{
            headers: {
            'Content-Type': 'application/json'
            }
        })
        console.log('RESP USER MONTH::',JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log("ERRORRR", error)
        return { data: null, error }
    } 
};

export { createRisk, getRiskDaily, getRiskWeekly, getRiskMonthly }
