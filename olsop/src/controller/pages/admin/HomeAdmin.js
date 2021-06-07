import React, { Component } from 'react';
import '../../assets/css/admin.css';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <b>
              Selamat Datang Admin{' '}
              <b style={{ color: 'blue' }}>{this.state.email}</b>, dalam Sytem
              Pengelolaan Barang Website JOnline Shoop
            </b>
            <br />
            <br />
            <b>Admin Dapat Melakukan Pengelolaan System Antara Lain : </b>
            <br />
            <div style={{ marginTop: 10 }}>
              1. Mengelola Barang yang akan dijual di website ( CRUD ) Barang
            </div>
            <div style={{ marginTop: 10 }}>
              2. Mengelola Keranjang yang di List User
            </div>
            <div style={{ marginTop: 10 }}>
              3. Memvertifikasi Pembelian User Bersangkuran
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeAdmin;
