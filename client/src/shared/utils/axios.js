import axios from 'axios';

import { TOKEN_NAME } from '../strings';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? 'TBD' : 'http://localhost:4000/',
  timeout: 9000
});

const errObj = (isError, error) => {
  return { isError, error };
};

export const getRequest = url => {
  return axiosInstance
    .get(url)
    .then(res => res.data)
    .catch(err => errObj(true, err.message));
};

export const postRequest = ({ url, data = {}, method = 'POST' }) => {
  return axiosInstance
    .request({
      method,
      url,
      data,
      headers: { [`${TOKEN_NAME}`]: localStorage.getItem(TOKEN_NAME) }
    })
    .then(res => res.data)
    .catch(err => errObj(true, err));
};
