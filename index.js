import React, { Component } from 'react';
import { render } from 'react-dom';
import Uploader from './Uploader';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div className='uploader'>
        <Uploader  />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
