import React, { Component } from "react";
import { ReactComponent as CaretRight } from "../../../assets/vector/CaretRight.svg";
import { ReactComponent as CaretLeft } from "../../../assets/vector/Caretleft.svg";
import { ReactComponent as CloseButton } from "../../../assets/vector/close.svg";
import { connect } from "react-redux";
import { ReactComponent as Increase } from "../../../assets/vector/AddItem.svg";
import { ReactComponent as Increase2 } from "../../../assets/vector/AddItem2.svg";
import { ReactComponent as Decrease } from "../../../assets/vector/RemoveItem.svg";
import AttributeComponent from "../../../pages/PDP/AttributeComponent/AttributeComponent";
import "./cart-item.css";
import { removeProduct, updateAttribute, changeQuantity } from "../../../Redux/cartSlice";

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.currency.currencyIndex,
    cartItem: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  const removeProducts = (payload) => dispatch(removeProduct(payload));
  const updateCart = (payload) => dispatch(updateAttribute(payload));
  const updateQuantity = (payload) => dispatch(changeQuantity(payload));

  return {
    removeProducts,
    updateCart,
    updateQuantity,
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
      this.props.removeProducts(id);
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
    const { currencyIndex, updateQuantity, cssname } = this.props;
    const { currency, amount } = prices[currencyIndex ?? 0];
    const { imagePosition } = this.state;

    const increaseQuantity = () => {
      updateQuantity({ value: 1, id });
    };

    const decreaseQuantity = () => {
      updateQuantity({ value: -1, id });
    };

    return (
      <div className={`cart ${cssname}`}>
        <div className="">
          <CloseButton className="close-button" onClick={this.removeItem} />
        </div>
        <div className="details">
          <div className="item-description">
            <div className="title">{name}</div>
            <div className="price">{`${currency.symbol}${amount}`}</div>
            <div className="attributes">
              {attributes.map((attribute, index) => (
                <AttributeComponent
                  productId={id}
                  attribute={attribute}
                  cssname={this.props.cssname}
                  selectedAttribute={selectedAttribute}
                  updateAttribute={this.updateAttribute}
                  key={`${id} ${index}`}
                />
              ))}
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
            <img src={image[imagePosition]} alt="" className="images" />
            <div className="slider">
              <div className="caret-left" onClick={this.slideImage} value={imagePosition}>
                <CaretLeft />
              </div>
              <div className="caret-right" onClick={this.slideImage} value={imagePosition}>
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
