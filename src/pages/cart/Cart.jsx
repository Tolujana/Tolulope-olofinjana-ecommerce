import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../../component/cartOverlay/cartItem/CartItem";
import "./cart.css";
import { getTotal } from "../../utils/functions";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
    currencyIndex: state.currency.currencyIndex,
  };
};

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      cartItem: { items },
      currencyIndex,
    } = this.props;
    const { totalQuantity, tax, totalAmount } = getTotal(items, currencyIndex);
    return (
      <div className="cart-wrapper">
        <div className="cart-title">CART</div>
        <div className="cart-checkout">
          {Object.keys(items).map((key, index) => {
            return (
              <div key={key}>
                <hr className="divider" />
                <CartItem item={items[key]} cssname="cart-page" />
              </div>
            );
          })}
        </div>
        <hr className="divider" />
        <div className={totalQuantity === 0 ? "none" : "checkout-details"}>
          <div className="tax">
            <span className="title">Tax 21%: </span>
            <span className="value">{tax}</span>
          </div>
          <div className="quantity">
            <span className="title">Quantity: </span>
            <span className="value">{totalQuantity}</span>
          </div>
          <div className="total">
            <span className="title">Total: </span>
            <span className="value">{totalAmount}</span>
          </div>
          <div className="order-button">
            <span className="title">ORDER </span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Cart);
