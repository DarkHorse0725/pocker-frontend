import axios from 'axios';

const call = (url, method, withToken = true, data = {}) => {
  const accessToken = localStorage.getItem('token');

  const currentTimestamp = new Date().getTime() / 1000;
  const expiredTimestamp =
    Number(localStorage.getItem('expiretime')) || Number.MAX_SAFE_INTEGER;

  if (
    withToken &&
    (currentTimestamp > expiredTimestamp ||
      !(window.ethereum && window.ethereum?.selectedAddress))
  ) {
    return new Promise((resolve, reject) => {
      reject(`Couldn't get an access token`);
    });
  }

  let header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (withToken) {
    header['Authorization'] = `Bearer ${accessToken}`;
  }

  const options = {
    url,
    method,
    headers: header,
    crossDomain: true,
    data,
  };

  return axios
    .request(options)
    .then((res) => res.data)
    .catch((error) => {
      console.log('Error:', error);
    });
};

export default call;
