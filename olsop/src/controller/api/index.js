import GetAPI from './get';
import PostAPI from './post';
import DeleteAPI from './delete';

const getProduct = () => GetAPI('product');
const postProduct = (data) => PostAPI('product', data);
const deleteProduct = (data) => DeleteAPI('product', data);

const API = {
  getProduct,
  postProduct,
  deleteProduct,
};

export default API;
