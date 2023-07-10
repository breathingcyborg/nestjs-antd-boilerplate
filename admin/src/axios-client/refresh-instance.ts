import axios from 'axios';
import { API_BASE_URL } from './constants';

const instance = axios.create({
    baseURL: API_BASE_URL,
    requiresAuth: false,
});

export default instance;