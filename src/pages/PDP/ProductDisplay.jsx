import React, { Component } from "react";
import DOMPurify, { sanitize } from "dompurify";

import "./product-display.css";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";
import TextAttribute from "./textAttributes/TextAttribute";
import SwatchAttribute from "./swatchAttribute/SwatchAttribute";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.productImage = React.createRef();
    this.productDetail = React.createRef();

    this.state = { id: "", displayedImage: "", description: "" };

    this.changeImage = (e) => {
      this.setState({ displayedImage: e.target.src });
    };

    this.loadData = (data) => {
      const { product } = data;
      const { gallery } = product;
      const { attributes } = product;
      // split product name so it can be displayed on multiple lines
      const [name, ...otherNames] = product.name.split(" ");
      //this is to make product description avaialabe as state

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
                  <TextAttribute attribute={attribute} />
                ) : (
                  <SwatchAttribute attribute={attribute} />
                )
              )}
            </div>

            <span className="price">price</span>
            <div className="price-value">
              {`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}
            </div>
            <button className="add-to-cart">add to cart</button>
            <div
              ref={this.productDetail}
              dangerouslySetInnerHTML={{
                __html: sanitize(product.description),
              }}
              className="details"
            ></div>
          </div>
        </div>
      );
    };
  }

  componentDidMount() {
    // const { id } = this.props.params;
    // this.setState({ id: id });
    //console.log(this.productDetail);
    //const element = this.productDetail.current;
    // element.innerHTML = this.state.description;
  }

  render() {
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

export default withParams(ProductDisplay);
