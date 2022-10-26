import React, { Component } from "react";

import "./swatch-attribute.css";

class SwatchAttribute extends Component {
  constructor(props) {
    super(props);

    this.state = { attribute: "" };

    this.handleClick = (e) => {
      let options = document.querySelectorAll(".option");
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");
    };
  }

  render() {
    const { name, id, items } = this.props.attribute;
    const selectedAttribute = this.props?.selectedAttribute;

    return (
      <div className={this.props.cssname}>
        <span className={id}>{name}</span>
        <div className="options">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={this.handleClick}
              value={{ [name]: item.displayValue }}
              className={
                selectedAttribute?.[name] === item.displayValue
                  ? ` ${name} option selected `
                  : `${name} option  `
              }
            >
              <div
                style={{
                  backgroundColor: item.displayValue,
                }}
                className={`${
                  item.displayValue === "White" ? "grey-border" : ""
                } content `}
              ></div>
            </div>
          ))}
          <div
            className="color-option"
            style={{ backgroundColor: "green" }}
          ></div>
          <div
            className="color-option"
            style={{ backgroundColor: "yellow" }}
          ></div>
        </div>
      </div>
    );
  }
}
export default SwatchAttribute;
