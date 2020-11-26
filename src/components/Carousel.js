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
      resolution: false,
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
      if (e.type === "mousedown") {
        startPoint = e.nativeEvent.clientX;
      }
      if (e.type === "touchstart") {
        startPoint = e.changedTouches[0].clientX;
      }
      move = true;
      return { startPoint, move };
    });
  };

  handleGestureMove = (e) => {
    let currentSliderElem = e.target.querySelector(".slider__elem");
    let currentPoint = null;
    this.setState((state) => {
      let { pointDifference, startPoint } = state;
      if (this.state.move && e.type === "mousemove") {
        currentPoint = e.nativeEvent.clientX;
      }
      if (this.state.move && e.type === "touchmove") {
        currentPoint = e.changedTouches[0].clientX;
      }
      pointDifference = currentPoint - startPoint;
      currentSliderElem.style.left = `${pointDifference}px`;
      return { pointDifference };
    });
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

  /* ==================== 
   checking cursor hover
  ==================== */

  handleCheckOver = (e) => {
    if (e.target.className === "slider") {
      this.setState((state) => {
        let { resolution } = state;
        resolution = true;
        return { resolution };
      });
    }
  };

  handleCheckOut = (e) => {
    if (e.target.className === "slider") {
      this.setState((state) => {
        let { resolution } = state;
        resolution = false;
        return { resolution };
      });
    }
    this.handleGestureOff();
  };

  render() {
    const slideIndex = this.state.arrayOfImages[this.state.currentSlide];
    const animationDirection = this.state.animationDirection;
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
          onMouseOver={this.handleCheckOver}
          onMouseOut={this.handleCheckOut}
        >
          {
            (slideIndex[currentSlide] = (
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
            ))
          }
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
