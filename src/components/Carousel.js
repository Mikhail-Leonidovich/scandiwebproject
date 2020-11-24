import React, { Component } from "react";
import allImages from "./AllImages.json";
import CarouselElement from "./CarouselElement.js";
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
      animationDirection: false,
    };
  }

  /* ==================== 
    Navigation buttons
  ==================== */

  handleChangeLeft = () => {
    this.setState((state) => {
      let { currentSlide, animationDirection } = state;
      animationDirection = true;
      currentSlide =
        currentSlide > 0 ? currentSlide - 1 : state.arrayOfImages.length - 1;
      return { currentSlide, animationDirection };
    });
  };

  handleChangeRight = () => {
    this.setState((state) => {
      let { currentSlide, animationDirection } = state;
      animationDirection = false;
      currentSlide =
        currentSlide === state.arrayOfImages.length - 1
          ? (currentSlide = 0)
          : (currentSlide = currentSlide + 1);
      return { currentSlide, animationDirection };
    });
  };

  /* ==================== 
      Gesture events
  ==================== */

  handleGestureOn = (e) => {
    this.setState((state) => {
      let { startPoint, move } = state;
      startPoint = e.nativeEvent.clientX;
      move = true;
      return { startPoint, move };
    });
  };

  handleGestureMove = (e) => {
    if (this.state.move) {
      this.setState((state) => {
        let { pointDifference, startPoint } = state;
        let currentPoint = e.nativeEvent.clientX;
        pointDifference = currentPoint - startPoint;
        return { pointDifference };
      });
    }
  };

  handleGestureOff = () => {
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
    const animationDirection = this.state.animationDirection;
    const arrayOfImages = this.state.arrayOfImages;
    const currentSlide = this.state.currentSlide;

    const funcCheckImageClass = (props) => {
      if (props === "moveLeft") {
        return slideIndex.imageClass + " img__swipe-right";
      }
      if (props === "moveRight") {
        return slideIndex.imageClass + " img__swipe-left";
      }
    };

    return (
      <div className="carousel">
        <div
          className="slider"
          onMouseDown={this.handleGestureOn}
          onMouseMove={this.handleGestureMove}
          onMouseUp={this.handleGestureOff}
          onTouchStart={this.handleGestureOn}
          onTouchMove={this.handleGestureMove}
          onTouchEnd={this.handleGestureOff}
        >
          {arrayOfImages.map((elem, index) => {
            if (index === currentSlide) {
              return (elem = (
                <CarouselElement
                  key={currentSlide}
                  url={slideIndex.url}
                  blockClass={slideIndex.blockClass}
                  imageClass={
                    animationDirection
                      ? funcCheckImageClass("moveLeft")
                      : funcCheckImageClass("moveRight")
                  }
                  alt={slideIndex.alt}
                />
              ));
            }
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
