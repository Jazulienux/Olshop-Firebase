import React from 'react';
import HomeAdmin from '../admin/HomeAdmin';
import ProductAdmin from '../admin/ProductAdmin';
import ProductAdd from '../admin/ProductAdd';
import CartAdmin from '../admin/CartAdmin';
import AdminVertif from '../admin/AdminVertif';

const routesAdmin = [
  {
    name: 'Home',
    fas: 'fas fa-home',
    path: '/',
    exact: true,
    main: (props) => <HomeAdmin email={props.email} />,
  },
  {
    name: 'Product',
    path: '/product',
    fas: 'fas fa-shopping-cart',
    exact: true,
    main: (props) => <ProductAdmin email={props.email} />,
  },
  {
    name: 'Cart',
    path: '/cart',
    fas: 'fas fa-cart-plus',
    exact: true,
    main: (props) => <CartAdmin email={props.email} />,
  },
  {
    name: 'Vertifikasi',
    path: '/vertif',
    fas: 'fas fa-check-circle',
    exact: true,
    main: (props) => <AdminVertif email={props.email} />,
  },
  {
    name: 'Add Product',
    path: '/product_add',
    fas: 'fas fa-check-circle',
    exact: true,
    main: (props) => <ProductAdd email={props.email} />,
  },
];

export default routesAdmin;
