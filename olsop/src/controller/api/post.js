import { domain } from './config';

const PostAPI = (path, data) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${domain}/${path}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
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

export default PostAPI;
