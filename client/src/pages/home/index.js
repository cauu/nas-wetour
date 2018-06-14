import React, { PureComponent } from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Article from './article';
import Recommend from './recommend';
import Search from './search';

import { listArticles } from '../../services/article';

import './style.less';

export default class Home extends PureComponent {
  tabs = [
    { title: '推荐行程' },
    { title: '梧桐随笔' }
  ]

  componentDidMount() {
    listArticles().then((res) => {
    });
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

  render() {
    return (
      <React.Fragment>
        <Search />

        <StickyContainer>
          <Tabs 
            tabs={this.tabs}
            initialPage={0}
            renderTabBar={this.renderTabBar}
          >
            <Recommend />

            <Article />
          </Tabs>
        </StickyContainer>
      </React.Fragment>
    );
  }
}