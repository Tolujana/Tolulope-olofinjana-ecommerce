import React, { Component } from "react";
import CartItem from "./cartItem/CartItem";
import "./cart-overlay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return { currencyIndex: state.currency.currencyIndex, cartItem: state.cart };
};

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log(this.props.cartItem);
    const {
      cartItem: { items },
      currencyIndex,
    } = this.props;
    return (
      <div className="cart-overlay-wrapper">
        <div className="cart-details">
          <div className="my-bag">My Bag:</div>
          <div className="items">
            {Object.keys(items).map((key, index) => {
              return (
                <CartItem
                  item={items[key]}
                  key={index}
                  cssname="cart-overlay"
                />
              );
            })}
          </div>
        </div>
        <div className="total-detail">
          <div className="total">Total</div>
          <div className="amount">
            {Object.keys(items).reduce((reducer, key, index) => {
              const { prices } = items[key].productDetails;

              return (
                reducer +
                items[key].quantity * prices[currencyIndex ?? 0].amount
              );
            }, 0)}
          </div>
        </div>
        <div className="buttons">
          <Link to="/cart">
            <button className="view-bag">View bag</button>
          </Link>

          <button className="check-out">Check Out</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartOverlay);
