import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

import React, { Component } from "react";
import NavBar from "./component/navBar/NavBar";
import Card from "./component/card/Card";
import ProductDisplay from "./pages/PDP/ProductDisplay";
import { CartOverlay } from "./component/cartOverlay/CartOverlay";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/category/Category";
import Cart from "./pages/checkOutPage/Cart";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOverlayOpen: false,
    };
    this.triggerOverlay = () => {
      this.setState({ isOverlayOpen: !this.state.isOverlayOpen });
    };
  }
  render() {
    console.log(this.state.isOverlayOpen);
    return (
      <div className="app">
        <BrowserRouter>
          <NavBar
            triggerOverlay={this.triggerOverlay}
            overlay={this.state.isOverlayOpen}
          />
          {/* <Card />
          <ProductDisplay />
          */}
          <div
            className={this.state.isOverlayOpen ? "overlay" : ""}
            onClick={this.triggerOverlay}
          ></div>

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

export default App;

// function App() {
//   return <div className="App">

//   </div>;
// }

// export default App;
