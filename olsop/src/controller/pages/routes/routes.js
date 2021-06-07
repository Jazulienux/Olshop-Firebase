import React from 'react';
import SignUp from '../landing/SignUp';
import Login from '../landing/Login';

const routes = [
  {
    name: 'Go to Login Page',
    path: '/login',
    exact: true,
    main: () => <Login />,
  },
  {
    name: 'Go to Register Page',
    path: '/signUp',
    exact: true,
    main: () => <SignUp />,
  },
];

export default routes;
