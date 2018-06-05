import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import List from './list';

import './style.less'

const dataSource = [
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28',
  },
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28',
  },
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28'
  }
];

/**
 * @desc 根据type决定调用的函数
 */
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

  render() {
    const { type, match } = this.props;
    const { name } = match.params;

    return (
      <div>
        <div className="wt-pl-header">
          {name}
        </div>

        <div className="wt-pl-subtitle">
          <div className="main">
            目的地结伴
          </div>
          <div className="sub">
            SPOT TOURS
          </div>
        </div>
        <StickyContainer>
          <Tabs 
            tabs={this.tabs}
            initialPage={0}
            renderTabBar={this.renderTabBar}
          >
            <List dataSource={dataSource}/>

            <List dataSource={dataSource}/>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default PlanList;