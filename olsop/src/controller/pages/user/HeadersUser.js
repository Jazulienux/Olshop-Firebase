import React from 'react';
import PrivateRoute from '../../auth/PrivateRoute';
import { Link, Switch } from 'react-router-dom';
import routesUser from '../routes/routesUser';
import '../../assets/css/admin.css';
import app from '../../config/base';

const signOut = (e) => {
  e.preventDefault();
  app
    .auth()
    .signOut()
    .then((res) => {
      window.location.reload(true);
    });
};

const HeaderUser = (props) => (
  <div className="wrapper">
    <div className="top_navbar">
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="top_menu">
        <div className="logo">
          Hello <b style={{ color: '#00cc00' }}>{props.email}, </b>
          Selamat Berbelanja
        </div>
        <ul>
          <li>
            <a onClick={(e) => signOut(e)}>
              <i className="fa fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="sidebar">
      <ul>
        {routesUser.map(
          (route, index) =>
            index <= 4 && (
              <li key={index}>
                <Link to={route.path}>
                  <span className="icon">
                    <i className={route.fas} />
                  </span>
                  <span className="title">{route.name}</span>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
    <Switch>
      {routesUser.map((route) => (
        <PrivateRoute
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={() => <route.main email={props.email} />}
        />
      ))}
    </Switch>
  </div>
);

export default HeaderUser;
