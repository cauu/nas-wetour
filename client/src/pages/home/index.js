import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Article from './article';
import Recommend from './recommend';
import Search from './search';
import TagRow from './tag-row';

import { extractDests } from '../../utils/index';

import './style.less';

@inject('planStore', 'articleStore')
@observer
export default class Home extends Component {
  static propTypes = {
    planStore: PropTypes.object,
    articleStore: PropTypes.object
  }

  tabs = [
    { title: '推荐行程' },
    { title: '梧桐随笔' }
  ]

  constructor(props) {
    super(props);

    props.planStore.getAllPlans();
    props.articleStore.getAllArticles();
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
    const { planStore, articleStore, history } = this.props;
    const planList = planStore.planList.toJS();
    const articleList = articleStore.articleList.toJS();

    return (
      <div className="wt-home-wrapper">
        <Search />

        <TagRow history={this.props.history} />

        <StickyContainer>
          <Tabs 
            tabs={this.tabs}
            initialPage={0}
            renderTabBar={this.renderTabBar}
            style={{background: 'black'}}
          >
            <Recommend dataSource={planList} loading={planStore.isLoading }/>

            <Article loading={articleStore.isLoading} history={history} articles={articleList} />
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}