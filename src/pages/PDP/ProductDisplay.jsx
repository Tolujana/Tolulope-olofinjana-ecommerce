import React, { Component } from "react";
import { sanitize } from "dompurify";

import "./product-display.css";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";
import TextAttribute from "./textAttributes/TextAttribute";
import SwatchAttribute from "./swatchAttribute/SwatchAttribute";
import { addProduct, removeProduct } from "../../Redux/cartSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
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
    };

    this.changeImage = (e) => {
      this.setState({ displayedImage: e.target.src });
    };

    this.updateAttribute = (attribute) => {
      this.setState((prev) => {
        return { attributes: { ...prev.attributes, ...attribute } };
      });
    };

    this.loadData = (data) => {
      const { product } = data;
      console.log(product);
      const { gallery } = product;
      const { attributes } = product;
      let error = false;
      // split product name so it can be displayed on multiple lines
      const [name, ...otherNames] = product.name.split(" ");

      //this is to provide argument for this.addToCart to update State

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

      console.log(payload);

      const addToCart = () => {
        //  we are doing this to confirm that all attributes
        //  have been selected if not show error
        const { selectedAttribute } = payload;
        let errorMessage = "Oops! you forget to select the following options ";

        attributes.forEach((attribute) => {
          if (!selectedAttribute[attribute.name]) {
            errorMessage = errorMessage + "\n Product " + attribute.name;
            console.log(errorMessage);
            error = true;

            //this is to the change the styling for the attribute
            if (!this.state.error.includes(attribute.name)) {
              this.setState((prev) => {
                return { ...prev, error: [...prev.error, attribute.name] };
              });
            }
          } else {
            //this is to remove selected attribute if still in error array
            if (this.state.error.includes(attribute.name)) {
              this.setState((prev) => {
                const index = prev.error.indexOf(attribute.name);
                if (index > -1) {
                  return {
                    ...prev,
                    error: [...prev.error].splice(index, 1),
                  };
                }
              });
            }
          }
        });

        console.log(error);

        if (!error) {
          this.props.addProduct(payload);
          this.setState({ changeButtonMessage: true });
        }
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
                      isError={this.state.error.includes(attribute.name)}
                      key={index}
                      cssname="pdp"
                      updateAttribute={this.updateAttribute}
                    />
                  </div>
                ) : (
                  <div>
                    <SwatchAttribute
                      attribute={attribute}
                      isError={this.state.error.includes(attribute.name)}
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
            <button
              className="buy-button"
              onClick={addToCart}
              style={
                this.state.changeButtonMessage
                  ? { backgroundColor: "red" }
                  : null
              }
            >
              {this.state.changeButtonMessage
                ? "Remove from Cart"
                : "Add to cart"}
            </button>
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
    console.log(this.state.error);

    const { id } = this.props.params;
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
