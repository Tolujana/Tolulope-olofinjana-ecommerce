import React, { Component } from "react";
import "./cart-item.css";
import image from "../../assets/images/god-in-control.png";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="cart-item">
        <div className="item-desc"></div>
        <div className="item-count"></div>
        <div className="item-image">
          <img src={image} alt="" className="images" />
        </div>
      </div>
    );
  }
}

export default CartItem;
