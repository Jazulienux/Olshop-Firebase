import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class CartAdmin extends Component {
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

  render() {
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
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
                      <tr>
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
                              Email &nbsp;&emsp;&emsp;&emsp;:&emsp;
                              {res[0].email}{' '}
                            </div>
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
                          </b>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CartAdmin;
