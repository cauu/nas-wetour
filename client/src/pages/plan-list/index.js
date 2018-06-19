import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import List from './list';

import './style.less'

/**
 * @desc 根据type决定调用的函数
 */
@inject('planStore')
@observer
class PlanList extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'tag'
  }

  tabs = [
    { title: '推荐行程' },
    { title: '所有行程' }
  ]

  typeText = {
    tag: {
      title: '主题结伴',
      subTitle: 'THEME TOUR'
    },
    dest: {
      title: '目的地结伴',
      subTitle: 'SPOT TOUR'
    }
  }

  constructor(props) {
    super(props);

    const { planStore, match, type } = props;

    const { name } = match.params;

    this.getPlans(type)(name);
  }

  getPlans = (type) => {
    const { planStore } = this.props;
    return (name) => type === 'tag' 
      ? planStore.searchPlanByTag(name)
      : planStore.searchPlanByDest(name)
    ;
  }

  renderTabBar = (props) => {
    return (<Sticky>
      {
        ({ style }) => 
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
      }
    </Sticky>);
  }

  onItemClick = (item) => {
    console.log('item', item);
  }

  render() {
    const { type, match, planStore } = this.props;
    const { name } = match.params;
    const textOfType = this.typeText[type];
    const planList = planStore.searchPlans.toJS();

    return (
      <div>
        <div className="wt-pl-header">
          {name}
        </div>

        <div className="wt-pl-subtitle">
          <div className="main">
            {textOfType['title']}
          </div>
          <div className="sub">
            {textOfType['subTitle']}
          </div>
        </div>
        <StickyContainer>
          <Tabs 
            tabs={this.tabs}
            initialPage={0}
            renderTabBar={this.renderTabBar}
          >
            <List type="recommend" onItemClick={this.onItemClick} dataSource={planList}/>

            <List type="ordinary" onItemClick={this.onItemClick} dataSource={planList}/>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default PlanList;