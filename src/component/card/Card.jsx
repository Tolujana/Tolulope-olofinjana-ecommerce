import React, { Component } from "react";
import "./card.css";
import { ReactComponent as Cart } from "../../assets/vector/cart.svg";
import { ReactComponent as Remove } from "../../assets/vector/close.svg";

import { connect } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  const removeProducts = (payload) => dispatch(removeProduct(payload));
  const addProducts = (payload) => dispatch(addProduct(payload));

  return { addProducts, removeProducts };
};

export class Card extends Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
    this.state = { isProductInCart: false };

    this.setDefaultAttributes = (attributes) => {
      const selectedOptionInAtrribute = attributes.reduce((combinedAttribute, attribute) => {
        const { name, items } = attribute;
        const value = items[0].displayValue;
        combinedAttribute = {
          ...combinedAttribute,
          [name]: value,
        };
        return combinedAttribute;
      }, {});

      return selectedOptionInAtrribute;
    };

    this.addItem = (e) => {
      e.preventDefault();
      const isProductInCart = Boolean(this.props?.cartItem?.items[this.props.id]);
      const { removeProducts, attributes, id, addProducts, cartItem, instock, brand, ...others } = this.props;

      if (isProductInCart) {
        e.currentTarget.className = "cart";
        removeProducts(id);
      } else {
        const selectedAttribute = this.setDefaultAttributes(attributes);

        const payload = {
          productDetails: { attributes, id, ...others },
          quantity: 1,
          selectedAttribute,
        };
        e.currentTarget.className = "cart-remove";

        addProducts(payload);
      }
    };
  }
  componentDidUpdate() {}

  render() {
    const { inStock, brand, image, name, symbol, amount } = this.props;

    return (
      <div className="card">
        <div className="wrapper">
          <div className="in-stock">{inStock ? "" : "OUT OF STOCK"}</div>
          <div className={`image wrapper ${inStock ? "" : "out-of-stock"}`}>
            <div className="badge">{brand}</div>
            <img src={image[0]} alt="" className="picture" />
            <div ref={this.buttonRef} className={inStock ? "cart" : "no-cart"} onClick={this.addItem}>
              <Cart className="basket" />
              <Remove className="remove-item" />
            </div>
          </div>
          <div className="content">
            <div className="title">{name}</div>
            <div className="price">
              <span className="currency">{`${symbol}${amount}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
