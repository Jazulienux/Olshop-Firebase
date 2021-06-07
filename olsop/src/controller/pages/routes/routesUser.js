import React from 'react';
import HomeUser from '../user/HomeUser';
import ProfileUser from '../user/ProfileUser';
import CartUser from '../user/CartUser';
import UserVertif from '../user/UserVertif';
import DashboardUser from '../user/DashboardUser';

const routesUser = [
  {
    name: 'Home Page',
    fas: 'fas fa-home',
    path: '/',
    exact: true,
    main: (props) => <DashboardUser email={props.email} />,
  },
  {
    name: 'List Product',
    fas: 'fas fa-shopping-cart',
    path: '/prodcut',
    exact: true,
    main: (props) => <HomeUser email={props.email} />,
  },
  {
    name: 'My Cart',
    path: '/cart',
    fas: 'fas fa-cart-plus',
    exact: true,
    main: (props) => <CartUser email={props.email} />,
  },
  {
    name: 'Buy Vertif',
    path: '/vertif',
    fas: 'fas fa-check-circle',
    exact: true,
    main: (props) => <UserVertif email={props.email} />,
  },
  {
    name: 'My Profile',
    fas: 'fas fa-user',
    path: '/profile',
    exact: true,
    main: (props) => <ProfileUser email={props.email} />,
  },
];

export default routesUser;
