import React, { Component } from "react";
import "./cart-item.css";
import image from "../../../assets/images/god-in-control.png";
import TextAttribute from "../../../pages/PDP/textAttributes/TextAttribute";
import SwatchAttribute from "../../../pages/PDP/swatchAttribute/SwatchAttribute";
import { ReactComponent as CloseButton } from "../../../assets/vector/close.svg";
import { removeProduct } from "../../../Redux/cartSlice";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch, ownProps) => {
  //if cart is does not include item, add item
  const remove = (payload) => dispatch(removeProduct(payload));
  return {
    removeProduct: remove,
  };
};

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.removeItem = (e) => {
      const { id } = this.props.item.productDetails;
      this.props.removeProduct(id);
    };
  }
  render() {
    const { productDetails, quantity, selectedAttribute } = this.props.item;
    return (
      <div className="cart-item">
        <div className="">
          <CloseButton className="close-button" onClick={this.removeItem} />
        </div>
        <div className="item-desc">
          <div className="title">{productDetails.name}</div>
          <div className="price">
            {`${productDetails.symbol} ${productDetails.amount}`}
          </div>
          <div className="attributes">
            {productDetails.attributes.map((attribute, index) =>
              attribute.type === "text" ? (
                <TextAttribute
                  attribute={attribute}
                  cssname="cart-overlay"
                  selectedAttribute={selectedAttribute}
                  key={index}
                />
              ) : (
                <SwatchAttribute
                  attribute={attribute}
                  cssname="cart-overlay"
                  key={index}
                  selectedAttribute={selectedAttribute}
                />
              )
            )}
          </div>
        </div>
        <div className="item-count"></div>
        <div className="item-image">
          <img src={productDetails.image} alt="" className="images" />
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CartItem);
