import React, { Component } from "react";
import "../styles/Carousel.css";
import imageForest from "../images/imageForest.jpg";
import imageOcean from "../images/imageOcean.jpg";
import imageShips from "../images/imageShips.jpg";
import imageTiger from "../images/tiger.jpg";

class Carousel extends Component {
  constructor(props) {
    super(props);

    let initialValue = 0;

    this.state = {
      newValue: 0,
      style: {
        transform: `translateX(${initialValue}%)`,
      },
    };
  }

  handleChangeLeft = () => {
    if (this.state.newValue != 0) {
      this.setState((state) => {
        let { transform } = state.style;
        let { newValue } = state;

        let newCurrentValue = newValue + 25;
        transform = `translateX(${newCurrentValue}%)`;
        return { style: { transform: transform }, newValue: newCurrentValue };
      });
    }
  };

  handleChangeRight = () => {
    if (this.state.newValue > -75) {
      this.setState((state) => {
        let { transform } = state.style;
        let { newValue } = state;

        if (newValue >= 0) {
          let newCurrentValue = newValue - 25;
          transform = `translateX(${newCurrentValue}%)`;
          return { style: { transform: transform }, newValue: newCurrentValue };
        } else {
          let newCurrentValue = -(Math.abs(newValue) + 25);
          transform = `translateX(${newCurrentValue}%)`;
          return { style: { transform: transform }, newValue: newCurrentValue };
        }
      });
    }
  };

  render() {
    return (
      <div className="carousel">
        <div className="slider" style={this.state.style}>
          <div className="slider__elem">
            <img className="slider__img" src={imageForest} alt="forest"></img>
          </div>
          <div className="slider__elem">
            <img className="slider__img" src={imageOcean} alt="ocean"></img>
          </div>
          <div className="slider__elem">
            <img className="slider__img" src={imageShips} alt="ships"></img>
          </div>
          <div className="slider__elem">
            <img className="slider__img" src={imageTiger} alt="tiger"></img>
          </div>
        </div>

        <div className="controls">
          <button className="arrow previos" onClick={this.handleChangeLeft}>
            <div className="left"></div>
          </button>
          <button className="arrow next" onClick={this.handleChangeRight}>
            <div className="right"></div>
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
