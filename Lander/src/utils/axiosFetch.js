// axiosFetch.js
import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json'
  }
  // Other custom settings can go here
});

export default axiosFetch;
