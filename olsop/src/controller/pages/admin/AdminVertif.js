import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../assets/css/admin.css';

class AdminVertif extends Component {
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

  procedVertif = (cond, id) => {
    let ref = firebase.database().ref('/buy');
    ref.on('value', (snapshot) => {
      snapshot.forEach((res) => {
        let data = firebase.database().ref(`/buy/${res.key}`);
        data.on('value', (updt) => {
          if (updt !== null && updt.val().idBeli === id) {
            if (cond === 1) {
              id = 0;
              data
                .child('status')
                .set('Pesanan Diterima')
                .then((result) => {
                  alert('Berhasil Diupdate');
                });
            } else {
              id = 0;
              data
                .child('status')
                .set('Pesanan Ditolak')
                .then((result) => {
                  alert('Berhasil Diupdate');
                });
            }
          }
        });
      });
    });
  };

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
                          <tr>
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
                                      style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                      }}
                                    />
                                  </>
                                );
                              })}
                              <b>
                                Total Bayar&emsp;&emsp;&nbsp;&nbsp;:&emsp;Rp.{' '}
                                {res.totalPembayaran}
                              </b>
                              <button
                                type="button"
                                className="btn_terima"
                                style={{
                                  width: 100,
                                  textAlign: 'center',
                                  right: 580,
                                }}
                                onClick={() =>
                                  window.confirm(
                                    'Apakah Anda Ingin Menerima Vertifikasi Pembelian ini ? '
                                  ) && this.procedVertif(1, res.idBeli)
                                }
                              >
                                Terima
                              </button>
                              <button
                                type="button"
                                className="btn_tolak"
                                style={{
                                  width: 100,
                                  textAlign: 'center',
                                  right: 473,
                                }}
                                onClick={() =>
                                  window.confirm(
                                    'Apakah Anda Ingin Menolak Vertifikasi Pembelian ini ? '
                                  ) && this.procedVertif(0, res.idBeli)
                                }
                              >
                                Tolak
                              </button>
                            </td>
                          </tr>
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

export default AdminVertif;
