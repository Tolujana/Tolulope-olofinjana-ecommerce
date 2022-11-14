import React, { Component } from "react";
import "./cart-item.css";
import { ReactComponent as CaretRight } from "../../../assets/vector/CaretRight.svg";
import { ReactComponent as CaretLeft } from "../../../assets/vector/Caretleft.svg";
import { ReactComponent as CloseButton } from "../../../assets/vector/close.svg";
import {
  removeProduct,
  updateAttribute,
  changeQuantity,
} from "../../../Redux/cartSlice";
import { connect } from "react-redux";
import { ReactComponent as Increase } from "../../../assets/vector/AddItem.svg";
import { ReactComponent as Increase2 } from "../../../assets/vector/AddItem2.svg";

import { ReactComponent as Decrease } from "../../../assets/vector/RemoveItem.svg";
import AttributeComponent from "../../../pages/PDP/AttributeComponent/AttributeComponent";

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.currency.currencyIndex,
    cartItem: state.cart,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  //if cart is does not include item, add item
  const remove = (payload) => dispatch(removeProduct(payload));
  const updateCart = (payload) => dispatch(updateAttribute(payload));
  const increaseQuantity = (payload) => dispatch(changeQuantity(payload));
  const decreaseQuantity = (payload) => dispatch(changeQuantity(payload));

  return {
    removeProduct: remove,
    updateCart,
    increase: increaseQuantity,
    decrease: decreaseQuantity,
  };
};

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: {},
      imagePosition: 0,
    };

    this.removeItem = (e) => {
      const { id } = this.props.item.productDetails;
      this.props.removeProduct(id);
    };

    this.updateAttribute = (attribute) => {
      const { id } = this.props.item.productDetails;

      const payload = { attribute, id };
      this.props.updateCart(payload);
    };

    this.slideImage = (e) => {
      const { image } = this.props.item.productDetails;
      const isSlidingLeft = e.currentTarget.className === "caret-left";
      const { imagePosition } = this.state;

      if (isSlidingLeft && imagePosition > 0) {
        this.setState({ imagePosition: this.state.imagePosition - 1 });
      }

      if (!isSlidingLeft && image.length - 1 > imagePosition) {
        this.setState({ imagePosition: this.state.imagePosition + 1 });
      }
    };
  }
  render() {
    const { productDetails, quantity, selectedAttribute } = this.props.item;
    const { id, prices, attributes, name, image } = productDetails;
    const { currencyIndex } = this.props;
    const increaseQuantity = () => {
      this.props.increase({ value: 1, id });
    };

    const decreaseQuantity = () => {
      this.props.decrease({ value: -1, id });
    };

    return (
      <div className={`cart ${this.props.cssname}`}>
        <div className="">
          <CloseButton className="close-button" onClick={this.removeItem} />
        </div>
        <div className="details">
          <div className="item-description">
            <div className="title">{name}</div>
            <div className="price">
              {`${prices[currencyIndex ?? 0].currency.symbol} ${
                prices[currencyIndex ?? 0].amount
              }`}
            </div>
            <div className="attributes">
              {productDetails.attributes.map(
                (attribute, index) => (
                  <AttributeComponent
                    attribute={attribute}
                    cssname={this.props.cssname}
                    selectedAttribute={selectedAttribute}
                    updateAttribute={this.updateAttribute}
                    key={`${productDetails.id} ${attribute.name} ${index}`}
                  />
                )

                // attribute.type === "text" ? (
                //   <TextAttribute
                //     attribute={attribute}
                //     cssname={this.props.cssname}
                //     selectedAttribute={selectedAttribute}
                //     updateAttribute={this.updateAttribute}
                //     key={index}
                //   />
                // ) : (
                //   <SwatchAttribute
                //     attribute={attribute}
                //     cssname={this.props.cssname}
                //     updateAttribute={this.updateAttribute}
                //     key={index}
                //     selectedAttribute={selectedAttribute}
                //   />
                // )
              )}
            </div>
          </div>

          <div className="item-count">
            <div className="count-control" onClick={increaseQuantity}>
              <Increase className="increase" />
              <Increase2 className="increase-overlap" />
            </div>
            <div className="count">{quantity}</div>
            <div className="count-control" onClick={decreaseQuantity}>
              <Decrease className="decrease" />
            </div>
          </div>
          <div className="item-image">
            <img
              src={image[this.state.imagePosition]}
              alt=""
              className="images"
            />
            <div className="slider">
              <div
                className="caret-left"
                onClick={this.slideImage}
                value={this.state.imagePosition}
              >
                <CaretLeft />
              </div>
              <div
                className="caret-right"
                onClick={this.slideImage}
                value={this.state.imagePosition}
              >
                <CaretRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
