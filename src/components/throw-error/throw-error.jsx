import React, { Component } from 'react';

import './throw-error.styl';

export default class ThrowError extends Component {
  state = {
    err: false
  };

  render() {

    if (this.state.err) {
      this.foo.bar = 0;
    }

    return (
      <button className="throw-error-btn" onClick={() => this.setState({ err: true })}>Throw Error</button>
    );
  }
}