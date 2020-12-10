import React, { Component } from "react";
import allImages from "./AllImages.json";
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
    let currentSliderElem = document.querySelector(".slider__elem");
    let currentPoint = null;
    this.setState((state) => {
      let { pointDifference, startPoint } = state;
      if (this.state.move && e.type === "mousemove") {
        currentPoint = e.nativeEvent.clientX;
        pointDifference = currentPoint - startPoint;
      }
      if (this.state.move && e.type === "touchmove") {
        currentPoint = e.changedTouches[0].clientX;
        pointDifference = currentPoint - startPoint;
      }
      currentSliderElem.style.left = `${pointDifference}px`;
      return { pointDifference };
    });
    currentSliderElem.style.left = "0";
  };

  handleGestureOff = () => {
    let currentSliderElem = document.querySelector(".slider__elem");
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
    currentSliderElem.style.left = "0";
  };

  /* ==================== 
   checking cursor hover
  ==================== */

  handleCheckOut = (e) => {
    let currentSliderElem = document.querySelector(".slider__elem");
    if (e.target.className === "slider" && this.state.move) {
      currentSliderElem.style.left = "0";
      this.handleGestureOff();
    }
  };

  handleCheckElemClass = (props) => {
    let elemClass = null;
    const slideIndex = this.state.arrayOfImages[this.state.currentSlide];
    if (props) {
      elemClass = `${slideIndex.classEl} inner__swipe-left`;
    } else {
      elemClass = `${slideIndex.classEl} inner__swipe-right`;
    }
    return elemClass;
  };



  render() {

    const BuildSliderInner = () => {
      const slideIndex = this.state.arrayOfImages[this.state.currentSlide];
      const animationDirection = this.state.animationDirection;
      /* can create any architecture */
      if (slideIndex.tagEl === "div") {
        return (
          <div className={this.handleCheckElemClass(animationDirection)} >
            <div className="inner__text">{slideIndex.text}</div>
          </div>
        )
      }
      if (slideIndex.tagEl === "img") {
        return (
          <img className={this.handleCheckElemClass(animationDirection)} src={slideIndex.url} alt={slideIndex.alt} />
        )
      }

    }

    const sliderInner = () => {
      return (
        <div className="slider__elem" >
          {BuildSliderInner()}
        </div>
      )
    }

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
          onMouseOut={this.handleCheckOut}
        >
          {sliderInner()}
        </div>

        <div className="controls">
          <button className="arrow previos" onClick={this.handleChangeLeft}>
            <div className="left"></div>
          </button>
          <button className="arrow next" onClick={this.handleChangeRight}>
            <div className="right"></div>
          </button>
        </div>
      </div >
    );
  }
}

export default Carousel;
