import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../../component/cartOverlay/cartItem/CartItem";
import CartOverlay from "../../component/cartOverlay/CartOverlay";
import "./cart.css";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
  };
};

export class Cart extends Component {
  render() {
    const { items } = this.props.cartItem;

    return (
      <div className="cart-checkout">
        {Object.keys(items).map((key, index) => {
          return (
            <>
              <hr className="divider" />
              <CartItem item={items[key]} key={index} cssname="cart-page" />
            </>
          );
        })}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Cart);
