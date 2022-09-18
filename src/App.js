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

export class App extends Component {
  render() {
    return (
      <>
        <div className="wrapper"></div>
        <BrowserRouter>
          <NavBar />
          {/* <Card />
          <ProductDisplay />
          */}
          <Routes>
            <Route path="/" element={<Category category="home" />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDisplay />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;

// function App() {
//   return <div className="App">

//   </div>;
// }

// export default App;
