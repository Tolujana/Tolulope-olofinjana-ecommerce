import React, { Component } from "react";
import "./product-display.css";
import image from "../../assets/images/god-in-control.png";
import QueryComponent from "../QueryComponent";
import { getProducts } from "../../utils/queries";

export class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "" };
  }

  componentDidUpdate() {
    const { id } = this.props.params;
    if (id !== this.state.category) {
      this.setState({ id: id });
    }
  }
  render() {
    return (
      <div className="product-wrapper">
        <QueryComponent query={getProducts} />
        <div className="product-thumbnails">
          <img src={image} alt="" className="thumbnail" />
          <img src={image} alt="" className="thumbnail" />
          <img src={image} alt="" className="thumbnail" />
        </div>

        <div className="product-image">
          <img src={image} alt="" className="image" />
        </div>
        <div className="product-description">
          <h2 className="title">Apollo</h2>
          <span className="subtitle"> Running Short</span>
          <span className="size">size</span>
          <div className="sizes">
            <div className="size-option"></div>
          </div>
          <span className="color">color</span>
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
  }
}

export default ProductDisplay;
