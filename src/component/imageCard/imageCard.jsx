import React, { Component } from "react";

export class imageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: null,
    };
  }
  generateUnqiueId() {
    let uniqueId = "";
    const selection = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++) {
      uniqueId += selection.charAt(
        Math.floor(Math.random() * selection.length)
      );
    }
    this.setState(
      {
        uniqueId: uniqueId,
      },
      () => this.updateElements()
    );
  }
  updateElements() {
    const container = document.querySelector(
      `#container-${this.state.uniqueId}`
    );
    const placeholder = document.querySelector(
      `#placeholder-${this.state.uniqueId}`
    );
    const image = document.querySelector(`#image-${this.state.uniqueId}`);
    image.onload = () => {
      image.setAttribute("style", "opacity: 1");
      container.setAttribute("style", "background: none");
      placeholder.setAttribute("style", "display: none");
    };
  }
  componentDidMount() {
    this.generateUnqiueId();
  }
  render() {
    const preload = `${this.props.src}?q=20`;
    const container = `container-${this.state.uniqueId}`;
    const placeholder = `placeholder-${this.state.uniqueId}`;
    const image = `image-${this.state.uniqueId}`;
    return (
      <div id={container} className="container">
        <img id={placeholder} src={preload} className="placeholder" />
        <img
          id={image}
          src={this.props.src}
          className="image"
          alt={this.props.altText}
        />
      </div>
    );
  }
}

export default imageCard;
