import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import { Slot } from 'react-slot-fill';

import PlanList from '../pages/plan-list';
import PlanDetail from '../pages/plan-detail';
import CreatePlan from '../pages/create-plan';

import { listArticles } from '../services/article';
import { listPlans } from '../services/plan';

import './style.less';

export const GlobalContext = React.createContext({});

export default class PlanLayout extends Component {
  articles = [];
  plans = [];

  render() {
    const {
      match,
      location,
      history
    } = this.props;

  return (
      <GlobalContext.Provider 
        value={{
          match,
          location,
          history
        }}
      >
        <div className="wt-nav-bar">
          <Icon type="left" size="lg" color="#666" onClick={history.goBack}/>
          <div className="title">
            <Slot name="TitleBar.Title" />
          </div>
          <div className="extra-slot">
            <Slot name="TitleBar.Extra" />
          </div>
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