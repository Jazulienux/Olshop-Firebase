import React, { Component } from 'react';

class DashboardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
    };
  }
  render() {
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <b>
              Selamat Datang User{' '}
              <b style={{ color: 'blue' }}>{this.state.email}</b>, dalam Website
              Penjualan Barang JOnline Shoop
            </b>
            <br />
            <br />
            <b>User Dapat Melakukan : </b>
            <br />
            <div style={{ marginTop: 10 }}>
              1. Pembelian Product yang nantinya tersimpan ke dalam cart
            </div>
            <div style={{ marginTop: 10 }}>
              2. Proses Pembelian Product berdasarkan Cart yang tersimpan
            </div>
            <div style={{ marginTop: 10 }}>
              3. Melihat Data Vertifikasi Pembelian Product
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardUser;
