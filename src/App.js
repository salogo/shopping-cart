import React, { Component } from 'react';
import Products from './components/Products';
import Basket from './components/Basket';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {  cartItems: [], products: [], filteredProducts: [] };
  }
  componentWillMount() {
    fetch('http://localhost:8000/products').then(res => res.json())
      .then(data => this.setState({ 
        products : data,
        filteredProducts:data

      }));
      }
  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }

 
 

  render() {
    return (
      <div className="container">



        <h1>Welcome to My Online Pants Store, Save Up to 50%</h1>
        <hr />
        <div className="row">

          <div className="col-md-9">
            <hr />
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
          </div>

          <div className="col-md-3">
            <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>

        </div>

      </div>
    );
  }
}

export default App;
