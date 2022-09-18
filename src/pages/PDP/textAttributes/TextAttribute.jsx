import React, { Component } from "react";

import "./text-attribute.css";

class TextAttribute extends Component {
  constructor(props) {
    super(props);

    this.state = { attribute: "" };

    this.handleClick = (e) => {
      let options = document.querySelectorAll(".option");
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      e.target.classList.add("selected");
    };
  }

  componentDidMount() {
    console.log(this.props.attribute);
    this.setState({ attribute: this.props.attribute });
  }
  render() {
    const { name, id, items } = this.props.attribute;
    return (
      <div>
        <div className="attribute-name">{id}</div>
        <div className={`${name} attribute`}>
          {items.map((item) => (
            <div
              onClick={this.handleClick}
              key={item.id}
              className={` ${item.id} option `}
            >
              {item.displayValue}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default TextAttribute;
