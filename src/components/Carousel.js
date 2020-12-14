import React, { Component, useState } from "react";
import allItems from "./AllItems.json";
import "../styles/Carousel.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointDifference: null,
      startPoint: null,
      endPoint: null,
      move: false,
      arrayOfItems: allItems,
      currentSlide: 0,
      sliderPosition: 0,
    };
  }

  /* ==================== 
    Navigation buttons
  ==================== */

  handleMoveLeft = () => {
    this.setState((state) => {
      let { sliderPosition, arrayOfItems } = state;
      sliderPosition >= 0 ? sliderPosition = -((arrayOfItems.length - 1) * 100) : sliderPosition = sliderPosition + 100;
      return { sliderPosition };
    });
  };

  handleMoveRight = () => {
    this.setState((state) => {
      let { sliderPosition, arrayOfItems } = state;
      sliderPosition > -(arrayOfItems.length - 1) * 100 ? sliderPosition = sliderPosition - 100 :
        sliderPosition = 0;

      return { sliderPosition };
    });
  };

  /* ==================== 
      Gesture events
  ==================== */

  /* handleGestureOn = (e) => {
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
  }; */

  /* ==================== 
   checking cursor hover
  ==================== */

  /* handleCheckOut = (e) => {
    let currentSliderElem = document.querySelector(".slider__elem");
    if (e.target.className === "slider" && this.state.move) {
      currentSliderElem.style.left = "0";
      this.handleGestureOff();
    }
  };
 */


  render() {
    const sliderPosition = this.state.sliderPosition;

    const BuildSliderInner = (index) => {
      const slideIndex = this.state.arrayOfItems[index];
      if (slideIndex.tagEl === "div") {
        return (
          <div className="slider__inner__txt" >
            <div className="inner__text">{slideIndex.text}</div>
          </div>
        )
      }
      if (slideIndex.tagEl === "img") {
        return (
          <img className="slider__inner__img" src={slideIndex.url} alt={slideIndex.alt} />
        )
      }
    }

    return (
      <div className="carousel" >

        {this.state.arrayOfItems.map((item, index) => {
          return (item = (< div key={index} className="slider__elem" style={{ transform: `translateX(${sliderPosition}%)` }}>{BuildSliderInner(index)}</div>));
        })}


        <div className="controls">
          <button className="arrow previos" onClick={this.handleMoveLeft}>
            <div className="left"></div>
          </button>
          <button className="arrow next" onClick={this.handleMoveRight}>
            <div className="right"></div>
          </button>
        </div>
      </div >
    );
  }
}

export default Carousel;
