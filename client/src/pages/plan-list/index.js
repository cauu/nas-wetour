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
    const { type, match } = this.props;
    const { name } = match.params;
    const textOfType = this.typeText[type];

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
            <List type="recommend" onItemClick={this.onItemClick} dataSource={dataSource}/>

            <List type="ordinary" onItemClick={this.onItemClick} dataSource={dataSource}/>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default PlanList;