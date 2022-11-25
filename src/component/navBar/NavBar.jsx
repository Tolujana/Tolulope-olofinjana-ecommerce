import React, { Component } from "react";
import "./nav-bar.css";
import cart from "../../assets/vector/cart.svg";
import logo from "../../assets/vector/a-logo.svg";
import arrowDown from "../../assets/vector/arrowDown.svg";
import { getMenuItems } from "../../utils/queries";
import { Link } from "react-router-dom";
import QueryComponent from "../queryComponent/QueryComponent";
import CartOverlay from "../cartOverlay/CartOverlay";
import { connect } from "react-redux";
import { updateCurrency } from "../../Redux/currencySlice";

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.currency,
    items: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrency: (payload) => dispatch(updateCurrency(payload)),
  };
};

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
    this.cartItem = React.createRef();

    this.state = {
      showCart: this.props.overlay,
      shouldShowCurrency: false,
    };

    this.switchCurrency = (e) => {
      const currency = e.target.getAttribute("value");
      this.props.updateCurrency(currency);
      this.setState({ currentCurrency: currency });
    };

    this.switchMenu = (e) => {
      let menuItems = this.menu.current.querySelectorAll(".menu-item");

      menuItems.forEach((menu) => {
        menu.classList.remove("active");
      });
      e.target.classList.add("active");
    };

    this.toggleCart = (e) => {
      this.setState({ showCart: !this.state.showCart });
      this.props.triggerOverlay();
    };

    this.displayCurrencyOptions = () => {
      this.setState({ shouldShowCurrency: !this.state.shouldShowCurrency });
    };

    this.loadData = (data) => {
      const { categories } = data;

      return categories?.map((category, index) => (
        <Link key={category.name} className="link" to={`/category/${category.name}`}>
          <div
            className={`menu-item ${category.name === "all" ? "active" : ""}`}
            onClick={this.switchMenu}
            key={category.name}
          >
            {category.name}
          </div>
        </Link>
      ));
    };

    this.loadCurrency = (data) => {
      const { currencies } = data;
      const { currencyIndex } = this.props.currencyIndex;

      return (
        <>
          <div className="currency-icon">
            <div>{currencies[currencyIndex ?? 0]?.symbol}</div>
            <img src={arrowDown} alt="" className="arrow-down" />
          </div>
          <div className={`currency-options ${this.state.shouldShowCurrency ? "" : "none"}`}>
            {currencies?.map(({ symbol, label }, index) => (
              <li
                key={index}
                className="currency"
                onClick={this.switchCurrency}
                value={index}
              >{`${symbol} ${label}`}</li>
            ))}
          </div>
        </>
      );
    };
  }
  componentDidUpdate(prevProps) {
    const { items, currencyIndex } = this.props;
    const { items: initialItems, currencyIndex: initialCurrencyIndex } = prevProps;
    if (initialItems !== items) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
    if (initialCurrencyIndex !== currencyIndex) {
      localStorage.setItem("currency", JSON.stringify(currencyIndex));
    }
  }

  render() {
    const { items, triggerOverlay } = this.props;
    const { showCart } = this.state;
    const ItemsKeysArray = Object.keys(items);

    return (
      <div className="nav-bar">
        <div ref={this.menu} className="menu-items">
          <QueryComponent query={getMenuItems} loadData={this.loadData} />
        </div>
        <img src={logo} alt="" className="logo" />
        <div className="actions">
          <div className="currency-switcher" onClick={this.displayCurrencyOptions}>
            <QueryComponent query={getMenuItems} loadData={this.loadCurrency} />
          </div>
          <div className="empty-cart" ref={this.cartItem} value={showCart}>
            <img src={cart} alt="" className="cart" onClick={triggerOverlay} />
            <div className={`${ItemsKeysArray.length > 0 ? "item-count" : "none"}`}>
              {ItemsKeysArray.reduce((reducer, key) => {
                return reducer + items[key].quantity;
              }, 0)}
            </div>
          </div>
        </div>
        <div className={`cart-items ${this.props.overlay ? "" : "none"}`}>
          <CartOverlay />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
