import React, { Component } from "react";
import "../styles/Carousel.css";
import imageForest from "../images/imageForest.jpg";
import imageOcean from "../images/imageOcean.jpg";
import imageShips from "../images/imageShips.jpg";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="carousel">
        <div className="slider">
          <div className="slider__elem">
            <img className="slider__img" src={imageForest} alt="forest"></img>
          </div>
          <div className="slider__elem">
            <img className="slider__img" src={imageOcean} alt="ocean"></img>
          </div>
          <div className="slider__elem">
            <img className="slider__img" src={imageShips} alt="ships"></img>
          </div>
        </div>

        <div className="controls">
          <button className="arrow left">
            <div className="previos"></div>
          </button>
          <button className="arrow right">
            <div className="next"></div>
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
