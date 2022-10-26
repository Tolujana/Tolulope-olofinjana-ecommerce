import React, { Component } from "react";

import "./text-attribute.css";

class TextAttribute extends Component {
  constructor(props) {
    super(props);
    this.option = React.createRef();
    this.state = { attribute: "" };

    this.handleClick = (e) => {
      //query parent container  for options instead of document. this is to prevent selection of other options under other attribute
      let options = this.option.current.querySelectorAll(`.option`);

      options.forEach((option) => {
        option.classList.remove("selected");
      });
      e.target.classList.add("selected");
      const value = e.target.getAttribute("value");
      const name = e.target.getAttribute("name");
      this.props.updateAttribute({ [name]: value });
    };
  }

  componentDidMount() {}
  render() {
    const { name, id, items } = this.props.attribute;
    const selectedAttribute = this.props?.selectedAttribute;
    console.log(this.props);
    return (
      <div className={this.props.cssname}>
        <div className="attribute-name">{name}</div>
        <div ref={this.option} className={`${name} attribute`}>
          {name !== "Size"
            ? items.map((item) => (
                <div
                  onClick={this.handleClick}
                  key={item.id}
                  value={item.displayValue}
                  name={name}
                  className={
                    selectedAttribute?.[name] === item.displayValue
                      ? ` ${name} option selected `
                      : `${name} option  `
                  }
                >
                  {item.displayValue}
                </div>
              ))
            : items.map((item) => (
                <div
                  onClick={this.handleClick}
                  key={item.id}
                  value={item.displayValue}
                  name={name}
                  className={
                    selectedAttribute?.[name] === item.displayValue
                      ? ` ${name} option selected `
                      : `${name} option  `
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
export default TextAttribute;
