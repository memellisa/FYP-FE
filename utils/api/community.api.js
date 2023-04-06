import axios from 'axios';
import { flaskURL } from "../constants";
import { auth } from "../../config";

const getAllForumFromDB = async () => {
    try {
        const response = await axios.get(`${flaskURL}/community/`,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const getPostsInForums = async (name) => {
    try {
        const response = await axios.get(`${flaskURL}/community/${name}`,{
            headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
            }
        });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const getPostByID = async (postID) => {
    try {
        const response = await axios.get(`${flaskURL}/community/post/${postID}`,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const postComment = async (postID, uid, comment) => {
    try {
        let payload = {"post_id": postID, "user_id": uid, "comment": comment}
        const response = await axios.post(`${flaskURL}/community/post/comment`, payload, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    }
}

export { getAllForumFromDB, getPostsInForums, getPostByID, postComment }