import React, { Component } from "react";
import "./product-display.css";
import image from "../../assets/images/god-in-control.png";
import QueryComponent from "../QueryComponent";
import { getProductDetails } from "../../utils/queries";
import { withParams } from "../../utils/HOCs";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "" };

    this.loadData = (data) => {
      const { product } = data;
      return (
        <div className="product-wrapper">
          <div className="product-thumbnails">
            <img src={product.gallery[0]} alt="" className="thumbnail" />
            <img src={product.gallery[2]} alt="" className="thumbnail" />
            <img src={product.gallery[0]} alt="" className="thumbnail" />
          </div>

          <div className="product-image">
            <img src={product.gallery[0]} alt="" className="image" />
          </div>
          <div className="product-description">
            <h2 className="title">{product.name}</h2>
            <span className="subtitle"> {product.attributes[0]?.name}</span>
            <span className="size">size</span>
            <div className="sizes">
              <div className="size-option"></div>
            </div>
            <span className="color">{product.attributes[1]?.name}</span>
            <div className="colors">
              <div
                className="color-option"
                style={{ backgroundColor: "black" }}
              ></div>
              <div
                className="color-option"
                style={{ backgroundColor: "green" }}
              ></div>
              <div
                className="color-option"
                style={{ backgroundColor: "yellow" }}
              ></div>
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
    console.log(this.props.params);
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
