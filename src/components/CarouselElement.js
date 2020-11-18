import React from "react";
import "../styles/CarouselElement.css";

const CarouselElement = (props) => {
  return (
    <div className={props.blockClass}>
      <img className={props.imageClass} src={props.url} alt={props.alt} />
    </div>
  );
};
export default CarouselElement;
