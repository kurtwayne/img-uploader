import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://jsonplaceholder.typicode.com/`,
  baseURL: 'https://test.rxflodev.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})