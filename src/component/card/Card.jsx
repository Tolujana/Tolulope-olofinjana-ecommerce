import React, { Component } from "react";
import "./card.css";
import { ReactComponent as Cart } from "../../assets/vector/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../Redux/cartSlice";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.attribute);
  }

  render() {
    const addItem = (e) => {
      e.preventDefault();
    };
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
            <img src={this.props.image} alt="" className="picture" />
            <div className="cart">
              <Cart className="basket" onClick={addItem} />
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

export default Card;
