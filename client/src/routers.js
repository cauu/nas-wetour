import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home';
import PlanLayout from './layout/plan';

export default () => (
  <Router>
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/plan" component={PlanLayout} />
    </React.Fragment>
  </Router>
);