import axios from 'axios'

const baseURL = 'http://localhost/api';

const client = axios.create({
    baseURL: baseURL,
});

export const getUsers = () => {
    client.get("/users")
        .then(data => console.log(data.data))
};
