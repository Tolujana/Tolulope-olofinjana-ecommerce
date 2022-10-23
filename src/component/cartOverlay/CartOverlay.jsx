import React, { Component } from "react";
import CartItem from "./cartItem/CartItem";
import "./cart-overlay.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    cartItem: state.product,
  };
};

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log(this.props.cartItem);
    const { items } = this.props.cartItem;
    return (
      <div className="cart-wrapper">
        <div className="cart-details">
          <div className="my-bag">My Bag:</div>
          <div className="items">
            {Object.keys(items).map((key, index) => {
              return <CartItem item={items[key]} key={index} />;
            })}
          </div>
        </div>
        <div className="total-detail">
          <div className="total">Total</div>
          <div className="amount">200.00</div>
        </div>
        <div className="buttons">
          <button className="view-bag">View bag</button>
          <button className="check-out">Check Out</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartOverlay);
