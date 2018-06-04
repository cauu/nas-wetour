import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home';

export default () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);