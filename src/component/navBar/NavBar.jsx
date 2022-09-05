import React, { Component } from "react";
import "./navbar.css";
import cart from "../../assets/vector/cart.svg";
import logo from "../../assets/vector/a-logo.svg";
import arrowDown from "../../assets/vector/arrowDown.svg";
export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowSwitcher: false,
      shouldShowCart: false,
    };
    this.handleClick = (e) => {
      let menuItems = document.querySelectorAll(".menuItem");
      menuItems.forEach((menu) => {
        menu.classList.remove("active");
      });
      e.target.classList.add("active");
    };
  }

  render() {
    return (
      <div className="navBar">
        <div className="menuItems">
          <div className="menuItem" onClick={this.handleClick}>
            Women
          </div>
          <div className="menuItem" onClick={this.handleClick}>
            CHild
          </div>
          <div className="menuItem" onClick={this.handleClick}>
            Men
          </div>
        </div>
        <img src={logo} alt="" className="logo" />
        <div className="actions">
          <div className="currencySwitcher">
            <span className="currencyIcon">$</span>
            <img src={arrowDown} alt="" className="arrowDown" />
          </div>
          <div className="emptyCart">
            <img src={cart} alt="" className="cart" />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
