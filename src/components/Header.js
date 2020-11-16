import React, { Component } from "react";
import "../styles/Header.css";

import scandiwebLogo from "../images/scandiweb_logo.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      burgerMenuCloseBtn: false,
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
          <div className="burger-menu" onClick={this.handleChangeBurgerStyle}>
            <span className="burger-line__top"></span>
            <span className="burger-line__middle"></span>
            <span className="burger-line__bottom"></span>
          </div>
          <nav className="header__nav">
            <a className="header__logo" href="#">
              <img
                className="scandiweb-logo"
                src={scandiwebLogo}
                alt="logo"
              ></img>
            </a>

            <ul className={this.state.visible ? "nav__list show" : "nav__list"}>
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
