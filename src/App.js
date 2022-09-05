import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import NavBar from "./component/navBar/NavBar";
import Card from "./component/card/Card";

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Card />
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
