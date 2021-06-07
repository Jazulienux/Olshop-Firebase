import { domain } from './config';

const DeleteAPI = (path, data) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${domain}/${path}/${data}`, {
      method: 'DELETE',
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
};

export default DeleteAPI;
