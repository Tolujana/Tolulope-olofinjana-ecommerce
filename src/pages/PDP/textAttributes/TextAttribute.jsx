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
    };
  }

  componentDidMount() {
    this.setState({ attribute: this.props.attribute });
  }
  render() {
    const { name, id, items } = this.props.attribute;
    return (
      <div>
        <div className="attribute-name">{id}</div>
        <div ref={this.option} className={`${name} attribute`}>
          {name !== "Size"
            ? items.map((item) => (
                <div
                  onClick={this.handleClick}
                  key={item.id}
                  value={item.id}
                  className={`${name} option `}
                >
                  {item.displayValue}
                </div>
              ))
            : items.map((item) => (
                <div
                  onClick={this.handleClick}
                  key={item.id}
                  value={item.id}
                  className={`${name} option `}
                >
                  {item.displayValue[0]}
                </div>
              ))}
        </div>
      </div>
    );
  }
}
export default TextAttribute;
