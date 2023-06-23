import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // required to handle the CSRF token
});


const logIn = async (data) => {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/users/login', data).then(res => res.data);
}

const logOut = async () => {
  return api.post('/api/users/logout').then(res => res.data);
}

export { logIn, logOut };


