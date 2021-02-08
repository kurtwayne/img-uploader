import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  // baseURL: 'https://test.rxflodev.com/uploads/',
  headers: {
    Authorization: 'Bearer {token}'
  }
})