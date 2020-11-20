import React, { Component } from "react";
import allImages from "../components/AllImages.json";
import CarouselElement from "../components/CarouselElement.js";
import "../styles/Carousel.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointDifference: null,
      startPoint: null,
      endPoint: null,
      move: false,
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
      return { currentSlide };
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
      return { currentSlide };
    });
  };

  handleMouseDown = (e) => {
    this.setState((state) => {
      let { startPoint, move } = state;
      startPoint = e.nativeEvent.clientX;
      move = !move;
      return { startPoint, move };
    });
  };

  handleMouseMove = (e) => {
    if (this.state.move) {
      this.setState((state) => {
        let { pointDifference, startPoint } = state;
        let currentPoint = e.nativeEvent.clientX;
        pointDifference = currentPoint - startPoint;
        return { pointDifference };
      });
    }
  };

  handleMouseUp = (e) => {
    this.setState((state) => {
      let { move, pointDifference } = state;
      move = !move;
      if (pointDifference !== null) {
        if (pointDifference < 0) {
          this.handleChangeLeft();
        } else {
          this.handleChangeRight();
        }
      }
      pointDifference = null;
      return { move, pointDifference };
    });
  };

  render() {
    const slideIndex = this.state.arrayOfImages[this.state.currentSlide];
    return (
      <div className="carousel">
        <div
          className="slider"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          {<CarouselElement {...slideIndex} />}
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
