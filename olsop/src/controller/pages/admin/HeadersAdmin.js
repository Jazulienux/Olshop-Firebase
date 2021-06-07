import React from 'react';
import PrivateRoute from '../../auth/PrivateRoute';
import { Link, Switch } from 'react-router-dom';
import routesAdmin from '../routes/routesAdmin';
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

const HeadersAdmin = (props) => (
  <div className="wrapper">
    <div className="top_navbar">
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="top_menu">
        <div className="logo">Management JOnline Shoop</div>
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
        {routesAdmin.map(
          (route, index) =>
            index <= 3 && (
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
      {routesAdmin.map((route) => (
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

export default HeadersAdmin;
