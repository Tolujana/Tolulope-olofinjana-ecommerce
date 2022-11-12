import React, { Component } from "react";
import "./nav-bar.css";
import cart from "../../assets/vector/cart.svg";
import logo from "../../assets/vector/a-logo.svg";
import arrowDown from "../../assets/vector/arrowDown.svg";
import { Query } from "@apollo/client/react/components";
import { getMenuItems } from "../../utils/queries";
import { Link } from "react-router-dom";
import QueryComponent from "../queryComponent/QueryComponent";
import CartOverlay from "../cartOverlay/CartOverlay";
import { connect } from "react-redux";
import { updateCurrency } from "../../Redux/currencySlice";

let currencyDetails = { currencyOptions: null, defaultCurrency: null };

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.currency,
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
      shouldShowSwitcher: false,
      showCart: this.props.overlay,
      error: false,
      loading: false,
      data: "free",
      shouldShowCurrency: false,
      currencies: [],
      currencyDetails: currencyDetails,
    };

    this.switchCurrency = (e) => {
      const currency = e.target.getAttribute("value");
      this.props.updateCurrency(currency);
      this.setState({ currentCurrency: currency });
    };

    this.switchMenu = (e) => {
      //instead of document.queryselector, use ref.queryselector  instead
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
        <Link
          key={category.name}
          className="link"
          to={`/category/${category.name}`}
        >
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
      console.log(this.props);
      return (
        <>
          <div className="currency-icon">
            <div>{currencies[currencyIndex ?? 0]?.symbol}</div>
            <img src={arrowDown} alt="" className="arrow-down" />
          </div>
          <div
            className={`currency-options ${
              this.state.shouldShowCurrency ? "" : "none"
            }`}
          >
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
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="nav-bar">
        <div ref={this.menu} className="menu-items">
          <QueryComponent query={getMenuItems} loadData={this.loadData} />
        </div>
        <img src={logo} alt="" className="logo" />
        <div className="actions">
          <div
            className="currency-switcher"
            onClick={this.displayCurrencyOptions}
          >
            <QueryComponent query={getMenuItems} loadData={this.loadCurrency} />
          </div>
          <div
            className="empty-cart"
            ref={this.cartItem}
            value={this.state.showCart}
          >
            <img
              src={cart}
              alt=""
              className="cart"
              onClick={this.props.triggerOverlay}
            />
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
