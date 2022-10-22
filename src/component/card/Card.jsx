import React, { Component } from "react";
import "./card.css";
import { ReactComponent as Cart } from "../../assets/vector/cart.svg";
import { connect } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //if cart is does not include item, add item
  const remove = (payload) => dispatch(removeProduct(payload));
  const add = (payload) => dispatch(addProduct(payload));
  return {
    addProduct: add,
    removeProduct: remove,
  };
};

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { addToCart: false };

    this.addItem = (e) => {
      e.preventDefault();
      const shouldAddToCart =
        this.props?.cartItem?.product?.items[this.props.id];

      if (shouldAddToCart !== undefined) {
        this.props.removeProduct(this.props.id);
      } else {
        const { attribute } = this.props;
        // this is to set default attribute for product item
        const defaultAttribute = attribute.map((attribute) => {
          const { name, items } = attribute;
          return { [name]: items?.displayValue };
        });

        const payload = {
          id: this.props.id,
          image: this.props.image,
          amount: 1,
          defaultAttribute,
        };

        this.props.addProduct(payload);
      }
    };
  }
  componentDidMount() {}

  render() {
    console.log(this.props);
    return (
      <div className="card">
        <div className="wrapper">
          <div className="in-stock">
            {this.props.inStock ? "" : "OUT OF STOCK"}
          </div>
          <div
            className={`image wrapper ${
              this.props.inStock ? "" : "out-of-stock"
            }`}
          >
            <div className="badge">{this.props.brand}</div>
            <img src={this.props.image} alt="" className="picture" />
            <div className="cart">
              <Cart
                className="basket"
                onClick={this.addItem}
                value={this.state.addToCart}
              />
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
