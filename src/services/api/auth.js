import api from './api';

const logIn = async (data) => {
    await api.get('/sanctum/csrf-cookie');
    return api.post('/api/users/login', data).then(res => res.data);
}
  
const logOut = () => {
    return api.post('/api/users/logout').then(res => res.data);
}

const user = () => {
    return api.get('/api/users/me').then(res => res.data);
}
  
export { logIn, logOut, user };