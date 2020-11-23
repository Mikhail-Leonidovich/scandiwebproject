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
    /* this.setState((state) => {
      let { startPoint, move } = state;
      startPoint = e.nativeEvent.clientX;
      move = true;
      return { startPoint, move };
    }); */
    console.log(e);
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

  handleMouseUp = () => {
    this.setState((state) => {
      let { move, pointDifference } = state;
      move = false;
      if (pointDifference !== null) {
        if (pointDifference < 0) {
          this.handleChangeRight();
        } else {
          this.handleChangeLeft();
        }
      }
      pointDifference = null;
      return { move, pointDifference };
    });
  };

  handleTouchStart = (e) => {
    this.setState((state) => {
      let { startPoint, move } = state;
      startPoint = e.changedTouches[0].clientX;
      move = true;
      return { startPoint, move };
    });
  };

  handleTouchMove = (e) => {
    if (this.state.move) {
      this.setState((state) => {
        let { pointDifference, startPoint } = state;
        let currentPoint = e.changedTouches[0].clientX;
        pointDifference = currentPoint - startPoint;
        return { pointDifference };
      });
    }
  };

  handleTouchEnd = () => {
    this.setState((state) => {
      let { move, pointDifference } = state;
      move = false;
      if (pointDifference !== null) {
        if (pointDifference < 0) {
          this.handleChangeRight();
        } else {
          this.handleChangeLeft();
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
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <CarouselElement {...slideIndex} />
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
