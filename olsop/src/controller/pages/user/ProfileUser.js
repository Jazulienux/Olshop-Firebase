import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import app from '../../config/base';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: '',
    };
  }
  handleChanged = (event) => {
    this.setState({ password: event.target.value });
  };

  handleTombolSimpan = () => {
    const check = app.auth().currentUser;
    if (check) {
      check.updatePassword(this.state.password).then((res) => {
        this.setState({ password: null });
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <div className="nav_atas">
              <ul>
                <li>
                  <Link to="/profile" className="active_nav_atas">
                    Edit Profile
                  </Link>
                </li>
              </ul>
            </div>
            <br />
            <form onSubmit={this.handleTombolSimpan}>
              <label style={{ fontSize: 18 }}>
                Email
                <input
                  type="text"
                  name="email"
                  disabled
                  required
                  placeholder="Email Lama"
                  id="email"
                  value={this.state.email}
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                ></input>
              </label>
              <label style={{ fontSize: 18 }}>
                Passowrd Baru
                <input
                  className="text_pwd"
                  type="password"
                  name="password"
                  required
                  placeholder="Password Baru"
                  id="password"
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  minLength={6}
                  onChange={this.handleChanged}
                ></input>
              </label>
              <button
                className="btn"
                type="submit"
                style={{
                  width: 400,
                  borderRadius: 5,
                  height: 40,
                  textTransform: 'capitalize',
                  fontSize: 18,
                }}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUser;
