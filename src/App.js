import "./App.css";
import React, { Component } from "react";
import NavBar from "./component/navBar/NavBar";
import ProductDisplay from "./pages/PDP/ProductDisplay";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/category/Category";
import Cart from "./pages/checkOutPage/Cart";
import { connect } from "react-redux";
import { displayMessage } from "./Redux/cartSlice";

const mapStateToProps = (state) => {
  const message = state.cart.message;
  return {
    message: message,
  };
};

const mapDispatchToProps = (dispatch) => {
  const display = (payload) => dispatch(displayMessage(payload));
  return {
    displayMessage: display,
  };
};
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOverlayOpen: false,
      showMessage: false,
    };
    this.messageRef = null;

    this.setMessageRef = (element) => {
      this.messageRef = element;
    };

    this.triggerOverlay = () => {
      this.setState({ isOverlayOpen: !this.state.isOverlayOpen });
    };
  }

  removeClass = (classname) => {
    setTimeout(() => {
      this.props.displayMessage({
        message: "",
        isError: false,
      });
      this.messageRef.classList.remove(classname);
    }, 4000);
  };
  componentDidUpdate(prevProps) {
    const { message } = this.props.message;

    if (message !== "") {
      const classList = this.messageRef.classList;
      console.log(classList);

      this.messageRef.classList.add("animate");
      this.removeClass("animate");
    }
  }
  render() {
    console.log(this.props.message);
    const { message, isError } = this.props.message;

    return (
      <div className="app">
        <BrowserRouter>
          <NavBar
            triggerOverlay={this.triggerOverlay}
            overlay={this.state.isOverlayOpen}
          />

          <div
            className={this.state.isOverlayOpen ? "overlay" : ""}
            onClick={this.triggerOverlay}
          ></div>
          <div className="message-wrapper">
            <div ref={this.setMessageRef} className="message">
              <div className="text-message">{message}</div>
              <div className={isError ? "red indicator" : "indicator"}></div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Category category="home" />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDisplay />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
