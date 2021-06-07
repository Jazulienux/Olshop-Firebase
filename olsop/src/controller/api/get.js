import { domain } from './config';

const GetAPI = (path) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${domain}/${path}`)
      .then((response) => response.json())
      .then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
  });
  return promise;
};

export default GetAPI;
