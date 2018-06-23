import React, { Component } from 'react';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import { TAGS } from '../../components/tag';

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
    const isByTag = type === 'tag';
    const defaultCover = `view-${Math.floor(Math.random() * 3 + 1)}`;

    const recommendPlans = (planList || []).filter((plan) => plan.recommend);
    const ordinaryPlans = (planList || []).filter((plan) => !plan.recommend);

    return (
      <div>
        <div className={classnames('wt-pl-header', {[name]: isByTag}, {[defaultCover]: !isByTag} )}>
          <div className="text">
            {isByTag ? TAGS[name] : name}
          </div>
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
            <List
              type="recommend"
              onItemClick={this.onItemClick}
              dataSource={recommendPlans}
              loading={planStore.isLoading}
            />

            <List
              type="ordinary"
              onItemClick={this.onItemClick}
              dataSource={ordinaryPlans}
              loading={planStore.isLoading}
            />
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default PlanList;