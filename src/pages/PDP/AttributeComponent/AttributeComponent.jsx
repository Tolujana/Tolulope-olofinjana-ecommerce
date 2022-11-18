import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAttribute } from "../../../Redux/cartSlice";
import "./attribute-component.css";

const mapDispatchToProps = (dispatch) => {
  const updateCartAttribute = (payload) => dispatch(updateAttribute(payload));
  return {
    updateCartAttribute,
  };
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart,
  };
};

class AttributeComponent extends Component {
  constructor(props) {
    super(props);
    this.option = React.createRef();
    this.state = { attribute: "", isAttributeSelected: false };

    const setStylingForSelectedAttribute = (event) => {
      let options = this.option.current.querySelectorAll(".option");
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      event.currentTarget.classList.add("selected");
    };

    const updateStateOnProductPageAndCart = (event) => {
      const value = event.currentTarget.getAttribute("value");
      const name = event.currentTarget.getAttribute("name");
      const { productId } = this.props;
      const isProductInCart = Boolean(this.props?.cartItem?.items[productId]);

      if (isProductInCart) {
        const payload = { attribute: { [name]: value }, id: productId };

        this.props.updateCartAttribute(payload);
      }
      this.props.updateAttribute({ [name]: value });
      this.setState({ isAttributeSelected: true });
    };

    this.selectAttributes = (e) => {
      setStylingForSelectedAttribute(e);
      updateStateOnProductPageAndCart(e);
    };

    this.setTextforSizeAttribute = (value) => {
      if (Number(value)) {
        return value;
      } else {
        const splitValue = value.replace("Extra", "X").split(" ");

        return splitValue.reduce((reducer, item) => {
          return reducer + item[0];
        }, "");
      }
    };
  }

  componentDidUpdate(prevProps) {
    //this is to update attribute on cart,cartOverlay and PDP
    const { productId } = this.props;
    const { name } = this.props.attribute;

    const value = this.props.cartItem.items[productId]?.selectedAttribute[name];
    const previousValue =
      prevProps.cartItem.items[productId]?.selectedAttribute[name];

    if (value !== previousValue) {
      this.props.updateAttribute({ [name]: value });
    }
  }

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
                  {this.setTextforSizeAttribute(item.displayValue)}
                </div>
              ))}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AttributeComponent);
