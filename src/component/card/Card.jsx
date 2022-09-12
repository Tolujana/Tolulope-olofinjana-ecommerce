import React, { Component } from "react";
import "./card.css";
import image from "../../assets/images/god-in-control.png";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    document.getElementsByClassName("title").innerText = "Happy Birthday!";
  }

  render() {
    return (
      <div className="card">
        <div className="wrapper">
          <div className="in-stock">
            {this.props.inStock ? "" : "OUT OF STOCK"}
          </div>
          <img src={this.props.image} alt="" className="image" />
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
