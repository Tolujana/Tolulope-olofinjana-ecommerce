import React, { Component } from "react";
import CartItem from "./cartItem/CartItem";
import "./cart-overlay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTotal } from "../../utils/functions";

const mapStateToProps = (state) => {
  return { currencyIndex: state.currency.currencyIndex, cartItem: state.cart };
};

export class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.displayCartItems = (items) => {
      let cartItem = Object.keys(items).map((key, index) => {
        return <CartItem item={items[key]} key={index} cssname="cart-overlay" />;
      });
      return cartItem;
    };
  }

  render() {
    const {
      cartItem: { items },
      currencyIndex,
    } = this.props;
    const { totalAmount } = getTotal(items, currencyIndex);

    return (
      <div className="cart-overlay-wrapper">
        <div className="my-bag">My Bag:</div>
        <div className="cart-details">
          <div className="items">
            {Object.keys(items).map((key, index) => {
              return <CartItem item={items[key]} key={index} cssname="cart-overlay" />;
            })}
          </div>
        </div>
        <div className="total-detail">
          <div className="total">Total</div>
          <div className="amount">{totalAmount}</div>
        </div>
        <div className="buttons">
          <Link to="/cart" className="link">
            <button className="view-bag">View bag</button>
          </Link>

          <button className="check-out">Check Out</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartOverlay);
