import React, { Component } from "react";
import "./product-display.css";
import QueryComponent from "../../component/QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";
import TextAttribute from "../../component/textAttributes/TextAttribute";
import SwatchAttribute from "../../component/swatchAttribute/SwatchAttribute";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "" };

    this.loadData = (data) => {
      const { product } = data;
      const { gallery } = product;
      const { attributes } = product;
      // split product name so it can be displayed on multiple lines
      const [name, ...otherNames] = product.name.split(" ");

      return (
        <div className="product-wrapper">
          <div className="product-thumbnails">
            {gallery.map((image, index) => (
              <img src={image} key={index} alt="" className="thumbnail" />
            ))}
          </div>

          <div className="product-image">
            <img src={gallery[0]} alt="" className="image" />
          </div>
          <div className="product-description">
            <h2 className="title">{name}</h2>
            <span className="subtitle"> {otherNames.join(" ")}</span>
            <div className="attributes">
              {attributes.map((attribute) =>
                attribute.type === "text" ? (
                  <TextAttribute attribute={attribute} />
                ) : (
                  <SwatchAttribute attribute={attribute} />
                )
              )}
            </div>

            <span className="price">price</span>
            <div className="price-value">$20.00</div>
            <button className="add-to-cart">add to cart</button>
          </div>
        </div>
      );
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    if (id !== this.state.id) {
      this.setState({ id: id });
    }
  }
  render() {
    return (
      <QueryComponent
        query={getProductDetails}
        loadData={this.loadData}
        variables={{ id: this.state.id }}
      />
    );
  }
}

export default withParams(ProductDisplay);
