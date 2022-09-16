import axios from 'axios';
import * as https from "https";

const httpsAgent = new https.Agent({rejectUnauthorized: false});

const localFetch = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: false,
    httpsAgent,
    changeOrigin: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export {localFetch};