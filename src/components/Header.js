import React, { Component } from "react";
import "../styles/Header.css";

import scandiwebLogo from "../../dist/images/scandiweb_logo.png";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <nav className="header__nav">
            <a className="header__logo" href="#">
              <img
                className="scandiweb-logo"
                src={scandiwebLogo}
                alt="logo"
              ></img>
            </a>

            <ul className="nav__list">
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
