import axios from 'axios';
axios.defaults.withCredentials = true; 
const httpRequest = axios.create({
    baseURL: 'http://localhost:3006',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;