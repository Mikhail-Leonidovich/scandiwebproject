import React, { Component } from "react";
import "../styles/App.css";
import Carousel from "./Carousel.js";
import Header from "./Header.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Carousel />
      </div>
    );
  }
}

export default App;
