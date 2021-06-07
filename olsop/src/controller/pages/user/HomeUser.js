import React, { Component } from 'react';
import * as firebase from 'firebase';
import API from '../../api';
import { Link } from 'react-router-dom';

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      listProduct: [],
      qty: [],
      status: false,
      total: [],
    };
    this.insert = {
      cart: [],
    };
  }

  ambilDataServerAPI = () => {
    API.getProduct().then((res) => {
      this.setState({
        listProduct: res,
      });
    });
  };

  componentDidMount() {
    this.ambilDataServerAPI();
  }

  simpanDataKeServerAPI = () => {
    firebase
      .database()
      .ref('/cart')
      .push(this.insert.cart)
      .then((res) => {
        this.setState({ cart: (this.insert.cart = []) });
      });
  };

  handleTombolSimpan = (event, idx) => {
    let uid = this.refs.uid.value;
    let email = this.state.email;
    let idBarang = event.id;
    let namaBarang = event.nama;
    let hargaBarang = event.harga;
    let imagesBarang = event.image;
    let totalQty = parseInt(this.state.qty[idx]);
    let subTotal = parseInt(this.state.total[idx]);

    if (
      uid &&
      email &&
      idBarang &&
      namaBarang &&
      hargaBarang &&
      imagesBarang &&
      totalQty !== 0 &&
      subTotal !== 0
    ) {
      const { cart } = this.insert;
      const indexArtikel = cart.findIndex((data) => {
        return data.uid === uid;
      });
      cart[indexArtikel].email = email;
      cart[indexArtikel].idBarang = idBarang;
      cart[indexArtikel].namaBarang = namaBarang;
      cart[indexArtikel].hargaBarang = hargaBarang;
      cart[indexArtikel].imagesBarang = imagesBarang;
      cart[indexArtikel].totalQty = totalQty;
      cart[indexArtikel].subTotal = subTotal;
      this.setState({ cart });
    } else if (
      email &&
      idBarang &&
      namaBarang &&
      hargaBarang &&
      imagesBarang &&
      totalQty !== 0 &&
      subTotal !== 0
    ) {
      alert('Successfully Add Produk To Cart');
      const uid = new Date().getTime().toString();
      const { cart } = this.insert;
      cart.push({
        uid,
        email,
        idBarang,
        namaBarang,
        hargaBarang,
        imagesBarang,
        totalQty,
        subTotal,
      });
      this.setState({ cart });
    } else if (totalQty === 0) {
      alert('Minimal Pemesanan 1');
    }
    this.refs.uid = '';
    this.simpanDataKeServerAPI();
  };

  componentDidUpdate() {
    if (this.state.status === false) {
      for (let index = 0; index < this.state.listProduct.length; index++) {
        this.state.qty.push(0);
        this.state.total.push(0);
      }
      this.setState({ status: true });
    }
  }

  decQty = (key, harga) => {
    let qty, total;
    this.setState((state) => {
      qty = this.state.qty.map((res, index) => {
        if (index === key) {
          if (res === 0) {
            return 0;
          }
          return res - 1;
        } else {
          return res;
        }
      });
      return {
        qty,
      };
    });
    this.setState((res) => {
      total = this.state.total.map((data, idx) => {
        if (idx === key) {
          return harga * qty[key];
        } else {
          return data;
        }
      });
      return {
        total,
      };
    });
  };

  incQty = (key, stok, harga) => {
    let qty, total;
    this.setState((state) => {
      qty = this.state.qty.map((res, index) => {
        if (index === key) {
          if (res >= stok) {
            return stok;
          }
          return res + 1;
        } else {
          return res;
        }
      });
      return {
        qty,
      };
    });
    this.setState((res) => {
      total = this.state.total.map((data, idx) => {
        if (idx === key) {
          return harga * qty[key];
        } else {
          return data;
        }
      });
      return {
        total,
      };
    });
  };

  render() {
    console.log(this.state.total);
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
              </ul>
            </div>
            <div className="form">
              {this.state.listProduct.map((res, idx) => {
                return (
                  <table border="1" key={res.id}>
                    <thead>
                      <tr>
                        <th style={{ width: 270, textAlign: 'center' }}>
                          Images Produk
                        </th>
                        <th colSpan="2" style={{ textAlign: 'center' }}>
                          Detail Produk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan="4">
                          <img src={res.image} className="image_center"></img>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: 580 }}>ID : {res.id}</td>
                        <td>Stok : {res.stok}</td>
                      </tr>
                      <tr>
                        <td>Nama : {res.nama}</td>
                        <td rowSpan="2">
                          Jumlah Pemesanan :
                          <br />
                          <input
                            type="text"
                            name="qty"
                            id="qty"
                            style={{ height: 38 }}
                            value={this.state.qty[idx]}
                            readOnly
                          ></input>
                          &emsp;
                          <button
                            className="button_decrement"
                            onClick={() => this.decQty(idx, res.harga)}
                          >
                            <b>-</b>
                          </button>
                          &emsp;
                          <button
                            className="button_increment"
                            onClick={() =>
                              this.incQty(idx, res.stok, res.harga)
                            }
                          >
                            <b>+</b>
                          </button>
                          <br />
                          Harga Total : Rp. {this.state.total[idx]}
                          <br />
                          <input type="hidden" name="uid" ref="uid" />
                          <button
                            type="submit"
                            style={{ display: 'block', marginTop: 10 }}
                            className="button_cart"
                            onClick={() => this.handleTombolSimpan(res, idx)}
                          >
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Harga : Rp. {res.harga}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeUser;
