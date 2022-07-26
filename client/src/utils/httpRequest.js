import axios from 'axios';
axios.defaults.withCredentials = true; 
const token = localStorage.getItem('user')!==null ? JSON.parse(localStorage.getItem('user'))?.token : ''
const httpRequest = axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://ecommerce-dantocthang.herokuapp.com',
    headers: { Authorization: `Bearer ${token}` }
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;