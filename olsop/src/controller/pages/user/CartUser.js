import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class CartUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
    };
    this.myCart = {
      listCart: [],
    };
  }

  ambilDataDariServerAPI = () => {
    let ref = firebase.database().ref('/cart');
    ref.on('value', (snapshot) => {
      this.setState({ myCart: (this.myCart.listCart = snapshot.val()) });
    });
  };

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }

  hapusCart = (id) => {
    let ref = firebase.database().ref('/cart');
    ref.on('value', (snapshot) => {
      snapshot.forEach((res) => {
        let data = firebase.database().ref(`/cart/${res.key}`);
        data.on('value', (del) => {
          del.forEach((delData) => {
            if (delData.val().uid === id) {
              data.remove();
            }
          });
        });
      });
    });
  };

  handleProsesPembelian = (key, total) => {
    let desMount = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    let date = new Date().getUTCDate();
    let mounth = new Date().getUTCMonth();
    let year = new Date().getUTCFullYear();
    let newMount = '';
    for (let index = 0; index < desMount.length; index++) {
      if (mounth === index) {
        newMount = desMount[index];
      }
    }
    let dateAdd = date + ' ' + newMount + ' ' + year;
    let time =
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds();

    let buyCheck = [];
    for (let index = 0; index < key.length; index++) {
      buyCheck.push({
        idBarang: key[index].idBarang,
        namaBarang: key[index].namaBarang,
        hargaBarang: key[index].hargaBarang,
        totalQty: key[index].totalQty,
        subTotal: key[index].subTotal,
        uid: key[index].uid,
      });
    }
    let idBeli = new Date().getTime();
    let process = {
      email: this.state.email,
      tanggal: dateAdd,
      waktu: time,
      pembelian: buyCheck,
      totalPembayaran: total,
      status: 'Menunggu Konfirmasi',
      idBeli: idBeli,
    };
    if (buyCheck.length !== 0) {
      firebase
        .database()
        .ref('/buy')
        .push(process)
        .then((res) => {
          alert('Successfully Buy Product');
        })
        .catch((err) => {
          alert('Failed Buy Product');
        });
      for (let index = 0; index < key.length; index++) {
        this.hapusCart(key[index].uid);
      }
    }
  };

  render() {
    let subTotal = 0;
    let procedBuy = [];
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <div className="nav_atas">
              <ul>
                <li>
                  <Link to="/cart" className="active_nav_atas">
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link to="/" className="">
                    Buy Product
                  </Link>
                </li>
              </ul>
            </div>
            <table border="1" style={{ width: '70%' }}>
              <thead>
                <tr>
                  <th style={{ width: 400, textAlign: 'center' }}>
                    Images Produk
                  </th>
                  <th style={{ textAlign: 'center' }}>Detail Produk</th>
                </tr>
              </thead>
              <tbody>
                {this.myCart.listCart !== null &&
                  Object.values(this.myCart.listCart).map((res) => {
                    return (
                      res[0].email === this.state.email &&
                      procedBuy.push(res[0]) &&
                      (subTotal += res[0].subTotal) && (
                        <tr key={res[0].uid}>
                          <td rowSpan="1">
                            <img
                              src={res[0].imagesBarang}
                              className="image_center"
                              style={{ width: 100 }}
                            ></img>
                            <center>
                              <button
                                type="submit"
                                className="button_decrement"
                                style={{
                                  width: 150,
                                }}
                                onClick={() =>
                                  window.confirm(
                                    'Apkah Barang ini ingin dihapus ? '
                                  ) && this.hapusCart(res[0].uid)
                                }
                              >
                                Hapus
                              </button>
                            </center>
                          </td>
                          <td style={{ width: 300 }}>
                            <b>
                              <div>ID Produk &emsp;:&emsp;{res[0].uid}</div>
                              <br />
                              <div>
                                Nama &emsp;&emsp;&emsp;:&emsp;
                                {res[0].namaBarang}{' '}
                              </div>
                              <br />
                              <div>
                                Harga &emsp;&emsp;&emsp;:&emsp;Rp.{' '}
                                {res[0].hargaBarang}
                              </div>
                              <br />
                              <div>
                                Qty &emsp;&emsp;&emsp;&emsp; :&emsp;
                                {res[0].totalQty} Buah{' '}
                              </div>
                              <br />
                              <div>
                                Subtotal&emsp;&emsp;:&emsp;Rp. {res[0].subTotal}
                              </div>
                              <br />
                            </b>
                          </td>
                        </tr>
                      )
                    );
                  })}
                <tr>
                  <td colSpan="1" style={{ textAlign: 'right' }}>
                    <b>Total Harga Pembelian : &emsp;Rp. {subTotal}</b>
                  </td>
                  <td>
                    <center>
                      <button
                        className="btn"
                        type="submit"
                        style={{
                          marginTop: 0,
                          marginBottom: 0,
                          marginLeft: 0,
                          marginRight: 0,
                          width: 400,
                          borderRadius: 5,
                          height: 40,
                          textTransform: 'capitalize',
                          fontSize: 18,
                        }}
                        onClick={() =>
                          this.handleProsesPembelian(procedBuy, subTotal)
                        }
                      >
                        Proses Pembelian
                      </button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CartUser;
