import React, { Component } from 'react';

import './header.styl';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <a href="#" className="header__logo-text">
              Star DB
            </a>
          </div>
          <ul className="header__list">
            <li className="list__item"><a href="#" className="list__link">People</a></li>
            <li className="list__item"><a href="#" className="list__link">Planets</a></li>
            <li className="list__item"><a href="#" className="list__link">Starships</a></li>
          </ul>
        </div>
      </header>
    );
  }
}