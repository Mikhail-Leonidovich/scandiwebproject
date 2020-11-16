import React, { Component } from "react";
import allImages from "../components/AllImages.json";

import "../styles/Carousel.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayOfImages: allImages,
      currentSlide: 0,
    };
  }

  handleChangeLeft = () => {
    this.setState((state) => {
      let { currentSlide } = state;
      if (currentSlide > 0) {
        currentSlide = currentSlide - 1;
      } else {
        currentSlide = state.arrayOfImages.length - 1;
      }
      return { currentSlide: currentSlide };
    });
  };

  handleChangeRight = () => {
    this.setState((state) => {
      let { currentSlide } = state;
      if (currentSlide === state.arrayOfImages.length - 1) {
        currentSlide = 0;
      } else {
        currentSlide = currentSlide + 1;
      }
      return { currentSlide: currentSlide };
    });
  };

  render() {
    return (
      <div className="carousel">
        <div className="slider">
          {this.state.arrayOfImages
            .map((elem, index) => {
              return (elem = (
                <div key={index} className={elem.blockStyle}>
                  <img
                    className={elem.imageStyle}
                    src={elem.url}
                    alt={elem.alt}
                  ></img>
                </div>
              ));
            })
            .find((elem, index) => {
              return index === this.state.currentSlide;
            })}
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
