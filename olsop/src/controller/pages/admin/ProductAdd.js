import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertProduk: {
        userId: 1,
        id: 1,
        nama: '',
        image: '',
        harga: 0,
        stok: 0,
      },
    };
  }

  handleTambahProduct = (event) => {
    let formInsertProduct = { ...this.state.insertProduk };
    let timestamp = new Date().getTime();
    formInsertProduct['id'] = timestamp;
    formInsertProduct['userId'] = timestamp;
    formInsertProduct[event.target.name] = event.target.value;
    this.setState({
      insertProduk: (this.state.insertProduk = formInsertProduct),
    });
  };

  handleTombolSimpan = () => {
    API.postProduct(this.state.insertProduk)
      .then((res) => {
        alert('Berhasil Menambahkan Produk');
      })
      .catch((err) => {
        alert('Gagal Menambahkan Produk');
      });
  };

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
            <br />
            <form onSubmit={this.handleTombolSimpan}>
              <label style={{ fontSize: 18 }}>
                Nama Barang
                <input
                  type="text"
                  name="nama"
                  required
                  placeholder="Nama Barang"
                  id="nama"
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  onChange={this.handleTambahProduct}
                ></input>
              </label>
              <label style={{ fontSize: 18 }}>
                Image URL
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Image URL Barang"
                  id="image"
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  onChange={this.handleTambahProduct}
                ></input>
              </label>

              <label style={{ fontSize: 18 }}>
                Stok Barang
                <input
                  type="text"
                  name="stok"
                  required
                  placeholder="Stok Barang"
                  id="stok"
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  onChange={this.handleTambahProduct}
                ></input>
              </label>

              <label style={{ fontSize: 18 }}>
                Harga Barang
                <input
                  type="text"
                  name="harga"
                  required
                  placeholder="Harga Barang"
                  id="harga"
                  style={{
                    height: 40,
                    width: 400,
                    textAlign: 'left',
                    color: 'black',
                  }}
                  onChange={this.handleTambahProduct}
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
                Tambah Barang
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductAdd;
