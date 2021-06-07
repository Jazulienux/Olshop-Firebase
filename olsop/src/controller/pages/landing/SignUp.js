import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import app from '../../config/base';
import { Link } from 'react-router-dom';
import wave from '../../assets/img/wave.png';
import img from '../../assets/img/img_login.svg';
import avatar from '../../assets/img/avatar.svg';
import '../../assets/css/style.css';
import routes from '../routes/routes';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <img src={wave} alt="wave" className="wave" />
      <div className="container">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="login-container">
          <form onSubmit={handleSignUp}>
            <img src={avatar} alt="" className="avatar" />
            <h2>
              <sup>
                <b style={{ fontSize: 20 }}>Register JOnline - Shoop</b>
              </sup>
            </h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="input-div two">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {routes.map(
              (route, idx) =>
                idx === 0 && (
                  <Link
                    style={{
                      fontSize: '1.25rem',
                      textDecoration: 'none',
                      color: '#333',
                    }}
                    key={idx}
                    to={route.path}
                  >
                    {route.name}
                  </Link>
                )
            )}
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
