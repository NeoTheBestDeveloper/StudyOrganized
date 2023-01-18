import axios from 'axios'

export const baseURL = 'http://localhost/api';

export const client = axios.create({
    baseURL: baseURL,

});
