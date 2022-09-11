import React, { Component } from "react";
import CartItem from "../cartItem/CartItem";
import "./cart-overlay.css";

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="cart-wrapper">
        <CartItem />
        <CartItem />
      </div>
    );
  }
}

export default CartOverlay;
