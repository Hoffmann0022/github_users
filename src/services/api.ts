import axios from "axios";

export const API = axios.create({
    baseURL: 'https://api.github.com',
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})