import React, { Component } from "react";
import "./card.css";
import { ReactComponent as Cart } from "../../assets/vector/cart.svg";
import { connect } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //if cart is does not include item, add item
  const remove = (payload) => dispatch(removeProduct(payload));
  const add = (payload) => dispatch(addProduct(payload));
  return {
    addProduct: add,
    removeProduct: remove,
  };
};

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { isProductInCart: false };

    this.addItem = (e) => {
      e.preventDefault();
      const isProductInCart = this.props?.cartItem?.cart?.items[this.props.id];

      if (Boolean(isProductInCart)) {
        this.props.removeProduct(this.props.id);
      } else {
        const { attributes } = this.props;
        // this is to set a default attribute for product item by combining them as an objecdt
        const selectedAttribute = attributes.reduce(
          (combinedAttribute, attribute) => {
            const { name, items } = attribute;
            combinedAttribute = {
              ...combinedAttribute,
              [name]: items[0].displayValue,
            };
            return combinedAttribute;
          },
          {}
        );
        const {
          addProduct,
          removeProduct,
          cartItem,
          inStock,
          brand,
          ...others
        } = this.props;
        //payload should contain product details and default attribute so as to display on Cart Overlay
        const payload = {
          productDetails: others,
          quantity: 1,
          selectedAttribute,
        };

        this.props.addProduct(payload);
      }
    };
  }
  componentDidUpdate() {}
  render() {
    // const isProductInCart = Boolean(
    //   this.props?.cartItem?.product?.items[this.props.id]
    // );

    return (
      <div className="card">
        <div className="wrapper">
          <div className="in-stock">
            {this.props.inStock ? "" : "OUT OF STOCK"}
          </div>
          <div
            className={`image wrapper ${
              this.props.inStock ? "" : "out-of-stock"
            }`}
          >
            <div className="badge">{this.props.brand}</div>
            <img src={this.props.image[0]} alt="" className="picture" />
            <div className={"cart"} onClick={this.addItem}>
              <Cart
                className="basket"
                style={{ fill: "blue" }}
                value={this.state.addToCart}
              />
            </div>
          </div>
          <div className="content">
            <div className="title">{this.props.name}</div>
            <div className="price">
              <span className="currency">{`${this.props.symbol} ${this.props.amount}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
