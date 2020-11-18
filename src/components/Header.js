import React, { Component } from "react";
import "../styles/Header.css";

import scandiwebLogo from "../images/scandiweb_logo.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      backgroundColor: "fffff",
    };
  }

  handleChangeBurgerStyle = () => {
    this.setState((state) => {
      let { visible } = state;
      visible = !visible;
      return { visible: visible };
    });
  };

  render() {
    return (
      <div className="header">
        <div className="container">
          <div
            className={
              this.state.visible ? "burger-menu active" : "burger-menu"
            }
            onClick={this.handleChangeBurgerStyle}
          >
            <span className="burger-line top"></span>
            <span className="burger-line middle"></span>
            <span className="burger-line bottom"></span>
          </div>
          <nav className="header__nav">
            <a className="header__logo" href="#">
              <img
                className="scandiweb-logo"
                src={scandiwebLogo}
                alt="logo"
              ></img>
            </a>

            <ul
              className={
                this.state.visible
                  ? "nav__list show navListSurfacing"
                  : "nav__list navListSurfacingBack"
              }
            >
              <li className="nav__item">
                <a className="nav__link" href="#">
                  about
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  works
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  teams
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  contacts
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
