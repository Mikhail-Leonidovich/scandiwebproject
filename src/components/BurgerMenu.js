import React from "react";
import "../styles/BurgerMenu.css";

const BurgerMenu = (props) => {
  return (
    <div
      className={props ? "burger__menu active" : "burger__menu"}
      onClick={props.handleChangeBurgerStyle}
    >
      <span className="burger__line top"></span>
      <span className="burger__line middle"></span>
      <span className="burger__line bottom"></span>
    </div>
  );
};

export default BurgerMenu;
