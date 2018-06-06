import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import PlanList from '../pages/plan-list';
import PlanDetail from '../pages/plan-detail';
import CreatePlan from '../pages/create-plan';

import './style.less';

export const GlobalContext = React.createContext({});

export default class PlanLayout extends Component {
  render() {
    const {
      match,
      location,
      history
    } = this.props;

    return (
      <GlobalContext.Provider value={{match, location, history}}>
        <div className="wt-nav-bar">
          <div className="btn-back" />
          <div className="title">
            筛选条件
          </div>
          <div className="extra-slot" />
        </div>
        <Router>
          <React.Fragment>
            <Route path={`${match.url}/tag/:name`} render={(props) => <PlanList type="tag" {...props} />} />
            <Route path={`${match.url}/dest/:name`} render={(props) => <PlanList type="dest" {...props} />} />
            <Route path={`${match.url}/detail/:id`} component={PlanDetail} />
            <Route path={`${match.url}/create`} component={CreatePlan} />
          </React.Fragment>
        </Router>
      </GlobalContext.Provider>
    );
  }
}