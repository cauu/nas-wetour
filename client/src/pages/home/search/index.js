import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import SearchResult from './result-panel';

import './style.less';

export default class Search extends PureComponent {
  state = {
    searchActive: false
  }

  onInputActive = () => {
    this.setState({
      searchActive: true
    });
  }

  onInputDismiss = () => {
    this.setState({
      searchActive: false
    });
  }

  render() {
    const { searchActive } = this.state;

    return (
      <div className={classnames('wt-search-wrapper', {'is-searching': searchActive})}>
        <Link to="/plan/create" className="left-wrapper">
          发布
        </Link>
        <div className="input-wrapper">
          <div className="icon-search" />
          <input
            onClick={this.onInputActive}
            className="input-search"
            placeholder="请输入目的地、主题"
          />
        </div>
        <div className="right-wrapper">
          {
            searchActive && 
              <div onClick={this.onInputDismiss}>取消</div> ||
              <div>me</div>
          }
        </div>
        <SearchResult visible={searchActive} />
      </div>
    );
  }
}