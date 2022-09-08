import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import NavBar from "./component/navBar/NavBar";
import Card from "./component/card/Card";
import ProductDisplay from "./component/PDP/ProductDisplay";

export class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <NavBar />
        <Card />
        <ProductDisplay />
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
