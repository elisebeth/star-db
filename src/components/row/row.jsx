import React, { Component } from 'react';

import './row.styl';

export default class Row extends Component {
  render() {

    const { left, right } = this.props;

    return (
      <section className="row">
        {left}
        {right}
      </section>
    );
  }
}