import React, { Component } from 'react';
import * as firebase from 'firebase';

class UserVertif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      listBuy: [],
    };
  }
  ambilDataDariServerAPI = () => {
    let ref = firebase.database().ref('/buy');
    ref.on('value', (snapshot) => {
      this.setState({ listBuy: (this.state.listBuy = snapshot.val()) });
    });
  };

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }
  render() {
    let nomor = 0;
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <b>Daftar List Produk</b>
            {this.state.listBuy !== null &&
              Object.values(this.state.listBuy).map((res) => {
                return (
                  res.email === this.state.email &&
                  (nomor += 1) && (
                    <>
                      <table border="1" style={{ width: '70%' }} key={nomor}>
                        <thead>
                          <tr>
                            <th style={{ width: 20 }}>Nomor</th>
                            <th style={{ width: 200 }}>Email Pembeli</th>
                            <th style={{ width: 200 }}>Waktu Pembelian</th>
                            <th style={{ width: 200 }}>
                              Status Konfirmasi Pembelian
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{nomor}</td>
                            <td>{res.email}</td>
                            <td>
                              {res.tanggal}, {res.waktu} WIB
                            </td>
                            <td>{res.status}</td>
                          </tr>
                        </tbody>
                        <tbody>
                          <td colSpan="4" style={{ width: 300 }}>
                            <b>Detail Pembelian : </b>
                            <hr style={{ marginTop: 10, marginBottom: 10 }} />
                            {res['pembelian'].map((beli) => {
                              return (
                                <>
                                  <div>
                                    <b>ID Produk</b>&emsp;&emsp;&emsp;:&emsp;
                                    {beli.uid}
                                  </div>
                                  <br />
                                  <div>
                                    <b>Nama Produk</b>&emsp;:&emsp;
                                    {beli.namaBarang}
                                  </div>
                                  <br />
                                  <div>
                                    <b>Harga Produk</b>&emsp;:&emsp;Rp.{' '}
                                    {beli.hargaBarang}
                                  </div>
                                  <br />
                                  <div>
                                    <b>Total Qty</b>
                                    &emsp;&emsp;&emsp;&nbsp;&nbsp;:&emsp;
                                    {beli.totalQty} Buah
                                  </div>
                                  <br />
                                  <div>
                                    <b>Subtotal</b>
                                    &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;:&emsp;Rp.{' '}
                                    {beli.subTotal}
                                  </div>
                                  <hr
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                  />
                                </>
                              );
                            })}
                            <b>
                              Total Bayar&emsp;&emsp;&nbsp;&nbsp;:&emsp;Rp.{' '}
                              {res.totalPembayaran}
                            </b>
                          </td>
                        </tbody>
                      </table>
                    </>
                  )
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default UserVertif;
