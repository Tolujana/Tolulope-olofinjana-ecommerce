import React, { Component } from "react";
import { sanitize } from "dompurify";
import "./product-display.css";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";
import { connect } from "react-redux";
import { ReactComponent as Increase } from "../../assets/vector/Add.svg";
import { ReactComponent as Decrease } from "../../assets/vector/takeaway.svg";
import AttributeComponent from "./AttributeComponent/AttributeComponent";

import {
  addProduct,
  removeProduct,
  changeQuantity,
  displayMessage,
  updateAttribute,
} from "../../Redux/cartSlice";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
    currencyIndex: state.currency.currencyIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  const displayMessages = (payload) => dispatch(displayMessage(payload));
  const updateCart = (payload) => dispatch(updateAttribute(payload));
  const remove = (payload) => dispatch(removeProduct(payload));
  const add = (payload) => dispatch(addProduct(payload));
  const updateQuantity = (payload) => dispatch(changeQuantity(payload));
  const decreaseQuantity = (payload) => dispatch(changeQuantity(payload));
  return {
    displayMessages,
    updateCart,
    addProduct: add,
    removeProduct: remove,
    updateQuantity,
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
      addToCartIsClicked: false,
    };

    this.changeImage = (e) => {
      this.setState({ displayedImage: e.target.src });
    };

    this.updateAttribute = (attribute) => {
      const { id } = this.props.params;
      const isProductInCart = Boolean(this.props?.cartItem?.items[id]);
      if (isProductInCart) {
        const payload = { attribute, id };
        this.props.updateCart(payload);
      }
      this.setState((prev) => {
        return { attributes: { ...prev.attributes, ...attribute } };
      });
    };

    const CheckErrorAndSetMessage = (attributes, selectedAttribute) => {
      let errorMessage = "Oops! you forgot to select ";
      let error = false;

      attributes.forEach((attribute) => {
        if (!selectedAttribute[attribute.name]) {
          errorMessage = errorMessage + attribute.name + ", ";
          error = true;
        }
      });
      // remove extra comma and change last"," to "&"
      errorMessage = errorMessage.slice(0, -1);

      this.props.displayMessages({
        message: errorMessage,
        isError: true,
      });
      return error;
    };

    this.loadData = (data) => {
      const { product } = data;

      const {
        gallery,
        attributes,
        id,
        name,
        description,
        inStock,
        brand,
        prices,
      } = product;

      const isProductInCart = Boolean(this.props?.cartItem?.items[id]);
      const { quantity } = this.props?.cartItem?.items?.[id] ?? 0;
      const { currencyIndex } = this.props;

      const payload = {
        productDetails: {
          id,
          name,
          attributes,
          image: gallery,
          prices: prices,
        },
        quantity: 1,
        selectedAttribute: this.state.attributes,
      };
      const { selectedAttribute } = payload;

      const addToCart = () => {
        this.setState({ addToCartIsClicked: true });
        const error = CheckErrorAndSetMessage(attributes, selectedAttribute);

        if (!error) {
          this.props.addProduct(payload);
          this.setState((prev) => {
            return { ...prev, changeButtonMessage: true };
          });
        }
      };

      const increaseQuantity = () => {
        this.props.updateQuantity({ value: 1, id: id });
      };

      const decreaseQuantity = () => {
        this.props.updateQuantity({ value: -1, id: id });
      };

      // split product name so it can be displayed on multiple lines
      const [firstName, ...otherNames] = name.split(" ");
      const numberOfWordsInOtherName = otherNames.length;
      return (
        <div className="product-wrapper">
          <div className="product-thumbnails">
            {gallery.map((image, index) => (
              <img
                src={image}
                key={index}
                onMouseOver={this.changeImage}
                alt=""
                className="thumbnail"
              />
            ))}
          </div>
          <div className={inStock ? "" : "out-of-stock"}>
            <div className="text">{inStock ? "" : "OUT OF STOCK"}</div>
            <div className="product-image">
              <img
                ref={this.productImage}
                src={this.state.displayedImage || gallery[0]}
                alt=""
                className="image"
              />
            </div>
          </div>
          <div className="product-description">
            <h2 className="title">
              {numberOfWordsInOtherName > 2 ? firstName : name}
            </h2>
            <span className="subtitle">
              {numberOfWordsInOtherName > 2 ? otherNames.join(" ") : ""}
            </span>
            <div className="attributes">
              {attributes.map(
                (attribute, index) => (
                  <AttributeComponent
                    attribute={attribute}
                    productId={id}
                    isError={this.state.addToCartIsClicked}
                    key={index}
                    cssname="pdp"
                    updateAttribute={this.updateAttribute}
                    selectedAttribute={this.state.attributes}
                  />
                )

                // attribute.type === "text" ? (
                //   <div className="">
                //     <TextAttribute
                //       attribute={attribute}
                //       isError={this.state.addToCartIsClicked}
                //       key={index}
                //       cssname="pdp"
                //       updateAttribute={this.updateAttribute}
                //     />
                //   </div>
                // ) : (
                //   <div>
                //     <SwatchAttribute
                //       attribute={attribute}
                //       isError={this.state.addToCartIsClicked}
                //       cssname="pdp"
                //       key={index}
                //       updateAttribute={this.updateAttribute}
                //     />
                //   </div>
                // )
              )}
            </div>
            <span className="price">price:</span>
            <div className="price-value">
              {`${product.prices[currencyIndex ?? 0].currency.symbol} ${
                product.prices[currencyIndex ?? 0].amount
              }`}
            </div>
            {isProductInCart && quantity > 0 ? (
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
              <button
                className={inStock ? "buy-button" : "buy-button no-cart"}
                onClick={addToCart}
              >
                Add to cart
              </button>
            )}
            <div
              ref={this.productDetail}
              dangerouslySetInnerHTML={{
                //sanitize to prevent XSS attack
                __html: sanitize(description),
              }}
              className="details"
            ></div>
          </div>
        </div>
      );
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    const selectedAttribute =
      this.props?.cartItem?.items[id]?.selectedAttribute;
    console.log(selectedAttribute);
    const isProductInCart = Boolean(selectedAttribute);
    if (isProductInCart && selectedAttribute !== this.state.selectedAttribute) {
      this.setState({ attributes: selectedAttribute });
    }
  }

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
