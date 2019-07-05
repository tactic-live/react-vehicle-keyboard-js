import React, { Component } from 'react';

require('./style.less');

class VerticalKeyboard extends Component {
  constructor(options = {}) {
    super(options);
  }

  render() {
    return (
      <div className="vehicle-keyboard">
        车辆键盘
      </div>
    );
  }
}

export default VerticalKeyboard;
