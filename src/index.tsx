import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/App/App';

const root = document.getElementById("root")
let renderMethod

if (root && root.innerHTML !== "") {
  renderMethod = ReactDOM.hydrate
} else {
  renderMethod = ReactDOM.render
}


renderMethod(<App />, document.getElementById("root"))