import React, { Component } from "react";
import CartItem from "./cartItem/CartItem";
import "./cart-overlay.css";

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="cart-wrapper">
        <div className="cart-details">
          <div className="my-bag">My Bag:</div>
          <div className="items">
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className="total">total</div>
        <div className="buttons">
          <button className="view-bag">View bag</button>
          <button className="check-out">Check Out</button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
