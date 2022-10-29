import React, { Component } from "react";

import "./swatch-attribute.css";

class SwatchAttribute extends Component {
  constructor(props) {
    super(props);
    this.option = React.createRef();
    this.state = { attribute: "", isAttributeSelected: false };

    this.selectAttributes = (e) => {
      setStylingForSelectedAttribute(e);
      updateStateOnProductPage(e);
    };
    const updateStateOnProductPage = (event) => {
      const value = event.currentTarget.getAttribute("value");
      const name = event.currentTarget.getAttribute("name");
      this.props.updateAttribute({ [name]: value });
      this.setState({ isAttributeSelected: true });
    };
    const setStylingForSelectedAttribute = (event) => {
      let options = this.option.current.querySelectorAll(".option");
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      event.currentTarget.classList.add("selected");
    };
  }

  render() {
    const { name, id, items } = this.props.attribute;
    const selectedAttribute = this.props?.selectedAttribute;

    return (
      <div
        className={
          !this.state.isAttributeSelected && this.props.isError
            ? "pdp-error"
            : this.props.cssname
        }
      >
        <span className="attribute-name">{name}</span>
        <div ref={this.option} className="options">
          {items.map((item, index) => (
            <div
              key={index}
              name={name}
              onClick={this.selectAttributes}
              value={item.displayValue}
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
        </div>
      </div>
    );
  }
}
export default SwatchAttribute;
