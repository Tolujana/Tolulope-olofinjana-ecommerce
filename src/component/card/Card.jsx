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
          <img src={image} alt="" className="image" />
          <div className="content">
            <div className="title"></div>
            <div className="price">
              <span className="currency">$</span>
              50.00
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
