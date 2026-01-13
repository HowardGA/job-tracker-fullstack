import api from './axios';

export const getUserDataRequest = () => {
    return api.get('/user/');
};