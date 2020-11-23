import React, { Component } from "react";
import "../styles/Header.css";
import "../styles/BurgerMenu.css";
import BurgerMenu from "../components/BurgerMenu.js";
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
      return { visible };
    });
  };

  render() {
    return (
      <div className="header">
        <div className="container">
          <BurgerMenu
            handleChangeBurgerStyle={() => {
              this.handleChangeBurgerStyle(this.state.visible);
            }}
            className={this.state.visible}
          />

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
                  ? "nav__list show list__surfacing"
                  : "nav__list list__surfacing__back"
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
