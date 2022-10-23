import axios from 'axios';

/* Axios api */
const api = axios.create({
  baseURL: `http://localhost:3333/tasks`,
});

export default api;
