import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cerulean-marlin-wig.cyclic.app/',
});

export default api;
