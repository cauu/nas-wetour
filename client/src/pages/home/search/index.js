import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';

import SearchResult from './result-panel';

import './style.less';

@inject('destStore')
@observer
export default class Search extends PureComponent {
  state = {
    searchActive: false,
    searched: []
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

  onInputChange = (event) => {
    if(!event.target.value) {
      this.setState({
        searched: []
      });
      return;
    }

    const { autoCompleteDest } = this.props.destStore;

    this.setState({
      searched: autoCompleteDest(event.target.value)
    });
  }

  render() {
    const { searchActive, searched } = this.state;

    return (
      <div className={classnames('wt-search-wrapper', {'is-searching': searchActive})}>
        <Link to="/plan/create" className="left-wrapper">
          发布
        </Link>
        <div className="input-wrapper">
          <div className="icon-search" />
          <input
            onClick={this.onInputActive}
            onChange={this.onInputChange}
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
        <SearchResult
          data={searched}
          visible={searchActive} />
      </div>
    );
  }
}