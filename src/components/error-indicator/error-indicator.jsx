import React, { Component } from 'react';

import './error-indicator.styl';

export default class ErrorIndicator extends Component {
  render() {
    return (
      <div className="error">
        <img src="" alt="" />
        <h2 className="error__title">BOOM!</h2>
        <p className="error__content">something has gone terribly wrong</p>
        <p className="error__content">(but we already sent droids to fix it)</p>
      </div>
    );
  }
}
