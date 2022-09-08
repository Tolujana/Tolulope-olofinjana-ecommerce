import React, { Component } from "react";
import "./nav-bar.css";
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
      let menuItems = document.querySelectorAll(".menu-item");
      menuItems.forEach((menu) => {
        menu.classList.remove("active");
      });
      e.target.classList.add("active");
    };
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="menu-items">
          <div className="menu-item" onClick={this.handleClick}>
            Women
          </div>
          <div className="menu-item" onClick={this.handleClick}>
            Child
          </div>
          <div className="menu-item" onClick={this.handleClick}>
            Men
          </div>
        </div>
        <img src={logo} alt="" className="logo" />
        <div className="actions">
          <div className="currency-switcher">
            <span className="currency-icon">$</span>
            <img src={arrowDown} alt="" className="arrow-down" />
          </div>
          <div className="empty-cart">
            <img src={cart} alt="" className="cart" />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
