import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../../component/cartOverlay/cartItem/CartItem";
import "./cart.css";

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

    this.getTotal = (items, currencyIndex) => {
      let symbol = null;
      let totalQuantity = 0;

      const total = Object.keys(items).reduce((reducer, key, index) => {
        const { prices } = items[key].productDetails;
        const { quantity } = items[key];
        const { currency, amount } = prices[currencyIndex ?? 0];
        if (symbol === null) {
          symbol = currency.symbol;
        }
        totalQuantity += quantity;
        return reducer + quantity * amount;
      }, 0);
      const tax = `${symbol ?? ""}${(total * 0.21).toFixed(2)}`;
      const totalAmount = `${symbol ?? ""}${total.toFixed(2)}`;

      return { tax, totalAmount, totalQuantity };
    };
  }

  render() {
    const {
      cartItem: { items },
      currencyIndex,
    } = this.props;
    const { totalQuantity, tax, totalAmount } = this.getTotal(items, currencyIndex);
    return (
      <div className="cart-wrapper">
        <div className="cart-checkout">
          {Object.keys(items).map((key, index) => {
            const { id } = items[key].productDetails;
            return (
              <>
                <hr className="divider" />
                <CartItem item={items[key]} key={`${id}${index} `} cssname="cart-page" />
              </>
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
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Cart);
