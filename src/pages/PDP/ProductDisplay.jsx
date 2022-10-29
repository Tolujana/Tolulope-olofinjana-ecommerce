import React, { Component } from "react";
import { sanitize } from "dompurify";

import "./product-display.css";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";
import TextAttribute from "./textAttributes/TextAttribute";
import SwatchAttribute from "./swatchAttribute/SwatchAttribute";
import {
  addProduct,
  removeProduct,
  changeQuantity,
} from "../../Redux/cartSlice";
import { connect } from "react-redux";
import { ReactComponent as Increase } from "../../assets/vector/Add.svg";
import { ReactComponent as Decrease } from "../../assets/vector/takeaway.svg";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //if cart is does not include item, add item
  const remove = (payload) => dispatch(removeProduct(payload));
  const add = (payload) => dispatch(addProduct(payload));
  const increaseQuantity = (payload) => dispatch(changeQuantity(payload));
  const decreaseQuantity = (payload) => dispatch(changeQuantity(payload));
  return {
    addProduct: add,
    removeProduct: remove,
    increase: increaseQuantity,
    decrease: decreaseQuantity,
  };
};
class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.productImage = React.createRef();
    this.productDetail = React.createRef();

    this.state = {
      id: "",
      displayedImage: "",
      changeButtonMessage: false,
      attributes: {},
      error: [],
      addToCartIsClicked: false,
    };

    this.changeImage = (e) => {
      this.setState({ displayedImage: e.target.src });
    };

    this.updateAttribute = (attribute) => {
      this.setState((prev) => {
        return { attributes: { ...prev.attributes, ...attribute } };
      });
    };

    const CheckErrorAndSetMessage = (attributes, selectedAttribute) => {
      let errorMessage = "Oops! you forget to select the following options ";
      let error = false;
      attributes.forEach((attribute) => {
        if (!selectedAttribute[attribute.name]) {
          errorMessage = errorMessage + "\n Product " + attribute.name;
          console.log(errorMessage);
          error = true;
        }
      });
      return error;
    };

    this.loadData = (data) => {
      const { product } = data;
      console.log(product);
      const { gallery } = product;
      const { attributes, id } = product;
      const { quantity } = this.props?.cartItem?.items?.[id] || 0;
      console.log(id);

      // split product name so it can be displayed on multiple lines
      const [name, ...otherNames] = product.name.split(" ");
      const { inStock, brand, gallery: galleries, prices, ...others } = product;

      const payload = {
        productDetails: {
          ...others,
          image: gallery[0],
          symbol: product.prices[0].currency.symbol,
          amount: product.prices[0].amount,
        },

        quantity: 1,
        selectedAttribute: this.state.attributes,
      };

      const { selectedAttribute } = payload;

      const addToCart = () => {
        this.setState({ addToCartIsClicked: true });
        const error = CheckErrorAndSetMessage(attributes, selectedAttribute);
        console.log(error);
        if (!error) {
          this.props.addProduct(payload);
          this.setState((prev) => {
            return { ...prev, changeButtonMessage: true };
          });
        }
      };

      const increaseQuantity = () => {
        this.props.increase({ value: 1, id: id });
      };

      const decreaseQuantity = () => {
        this.props.decrease({ value: -1, id: id });
      };

      return (
        <div className="product-wrapper">
          <div className="product-thumbnails">
            {gallery.map((image, index) => (
              <img
                value={image}
                src={image}
                key={index}
                onMouseOver={this.changeImage}
                alt=""
                className="thumbnail"
              />
            ))}
          </div>

          <div className="product-image">
            <img
              ref={this.productImage}
              src={this.state.displayedImage || gallery[0]}
              alt=""
              className="image"
            />
          </div>
          <div className="product-description">
            <h2 className="title">{name}</h2>
            <span className="subtitle"> {otherNames.join(" ")}</span>
            <div className="attributes">
              {attributes.map((attribute, index) =>
                attribute.type === "text" ? (
                  <div className="">
                    <TextAttribute
                      attribute={attribute}
                      isError={this.state.addToCartIsClicked}
                      key={index}
                      cssname="pdp"
                      updateAttribute={this.updateAttribute}
                    />
                  </div>
                ) : (
                  <div>
                    <SwatchAttribute
                      attribute={attribute}
                      isError={this.state.addToCartIsClicked}
                      cssname="pdp"
                      key={index}
                      updateAttribute={this.updateAttribute}
                    />
                  </div>
                )
              )}
            </div>
            <span className="price">price</span>
            <div className="price-value">
              {`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}
            </div>
            {this.state.changeButtonMessage && quantity > 0 ? (
              <div className="quantity">
                <div className="count-control">
                  <Decrease className="decrease" onClick={decreaseQuantity} />
                </div>
                <div className="count">{quantity}</div>
                <div className="count-control">
                  <Increase className="increase" onClick={increaseQuantity} />
                </div>
              </div>
            ) : (
              <button className="buy-button" onClick={addToCart}>
                Add to cart
              </button>
            )}
            <div
              ref={this.productDetail}
              dangerouslySetInnerHTML={{
                //sanitize to prevent XSS attack
                __html: sanitize(product.description),
              }}
              className="details"
            ></div>
          </div>
        </div>
      );
    };
  }

  componentDidMount() {}

  render() {
    const { id } = this.props.params;
    console.log(this.props);
    return (
      <QueryComponent
        query={getProductDetails}
        loadData={this.loadData}
        variables={{ id: id }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(ProductDisplay));
