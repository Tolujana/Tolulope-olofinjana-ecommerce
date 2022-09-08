import React, { Component } from "react";
import "./product-display.css";
import image from "../../assets/images/god-in-control.png";

export class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="product-wrapper">
        <div className="product-thumbnails">
          <img src={image} alt="" className="image" />
          <img src={image} alt="" className="image" />
          <img src={image} alt="" className="image" />
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
