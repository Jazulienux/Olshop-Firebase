import React, { Component } from 'react';
import API from '../../api';
import { Link } from 'react-router-dom';

class ProductAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
    };
  }

  ambilDataServerAPI = () => {
    API.getProduct().then((res) => {
      this.setState({ listProduct: res });
    });
  };

  handleHapusProduct = (data) => {
    API.deleteProduct(data).then((res) => {
      this.ambilDataServerAPI();
    });
  };

  componentDidMount() {
    this.ambilDataServerAPI();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main_container">
          <div className="item">
            <div className="nav_atas">
              <ul>
                <li>
                  <Link to="/product_add">Add Product</Link>
                </li>
                <li>
                  <Link to="/product" className="active_nav_atas">
                    Show Product
                  </Link>
                </li>
              </ul>
            </div>
            <div className="form">
              {this.state.listProduct.map((res) => {
                return (
                  <table border="1" key={res.id}>
                    <thead>
                      <tr>
                        <th style={{ width: 200, textAlign: 'center' }}>
                          Images Produk
                        </th>
                        <th colSpan="1" style={{ textAlign: 'center' }}>
                          Detail Produk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan="3">
                          <img src={res.image} className="image_center"></img>
                        </td>
                        <td>ID : {res.id}</td>
                      </tr>
                      <tr>
                        <td style={{ width: 580 }}>Nama : {res.nama} </td>
                      </tr>
                      <tr>
                        <td>Stok : {res.stok}</td>
                      </tr>
                      <tr>
                        <td>
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
                                ) && this.handleHapusProduct(res.id)
                              }
                            >
                              Hapus
                            </button>
                          </center>
                        </td>
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

export default ProductAdmin;
