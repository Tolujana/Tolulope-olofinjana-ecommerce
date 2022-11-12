import React, { Component } from "react";

import "./attribute-component.css";

class TextAttribute extends Component {
  render() {
    return <div> TextAttribute</div>;
  }
}

class AttributeComponent extends Component {
  constructor(props) {
    super(props);
    this.option = React.createRef();
    this.state = { attribute: "", isAttributeSelected: false };

    this.selectAttributes = (e) => {
      //query parent container  for options instead of document. this is to prevent selection of other options in other attribute
      let options = this.option.current.querySelectorAll(`.option`);

      // this is to change the styling of selected option
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");

      // this is to set state in PDP page based on selected attribute ( push state up)
      const value = e.currentTarget.getAttribute("value");
      const name = e.currentTarget.getAttribute("name");
      this.props.updateAttribute({ [name]: value });
      this.setState({ isAttributeSelected: true });
    };
  }

  componentDidMount() {}
  render() {
    const { name, type, items } = this.props.attribute;
    const selectedAttribute = this.props?.selectedAttribute;

    return (
      <div
        className={
          !this.state.isAttributeSelected && this.props.isError
            ? "pdp-error"
            : this.props.cssname
        }
      >
        <div className="attribute-name">{`${name}:`}</div>
        <div ref={this.option} className={`${type} attribute`}>
          {type === "swatch"
            ? items.map((item, index) => (
                <div
                  key={index}
                  name={name}
                  onClick={this.selectAttributes}
                  value={item.displayValue}
                  className={
                    selectedAttribute?.[name] === item.displayValue
                      ? `option selected`
                      : `option`
                  }
                >
                  <div
                    style={{
                      backgroundColor: item.displayValue,
                    }}
                    className={`${
                      item.displayValue === "White" ? "grey-border" : ""
                    } content`}
                  ></div>
                </div>
              ))
            : name !== "Size"
            ? items.map((item, index) => (
                <div
                  onClick={this.selectAttributes}
                  key={index}
                  value={item.displayValue}
                  name={name}
                  className={
                    selectedAttribute?.[name] === item.displayValue
                      ? ` ${name} option selected `
                      : `${name} option`
                  }
                >
                  {item.displayValue}
                </div>
              ))
            : items.map((item, index) => (
                <div
                  onClick={this.selectAttributes}
                  key={index}
                  value={item.displayValue}
                  name={name}
                  className={
                    selectedAttribute?.[name] === item.displayValue
                      ? ` ${name} text option selected `
                      : `${name} text option  `
                  }
                >
                  {Number(item.displayValue)
                    ? item.displayValue
                    : item.displayValue[0]}
                </div>
              ))}
        </div>
      </div>
    );
  }
}
export default AttributeComponent;
