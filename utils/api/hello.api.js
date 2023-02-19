import { useEffect, useState } from "react";
import ApiManager from "./ApiManager";

const useGetHello = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        ( async () => {
        try {
            const response = await ApiManager('/hello', { method: 'GET' });
            // console.log("HELLO",response.data)
            setData(response.data);
        } catch (error) {
            // console.log("ERROR",error)
            setError(error);
        } finally {
            // console.log("LOADED")
            setLoaded(true);
        }
    })();
}, []);
    
    return { data, error, loaded };
};

export { useGetHello }
