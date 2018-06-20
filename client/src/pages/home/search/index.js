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
    inputText: '',
    searched: []
  }

  onInputActive = () => {
    if(!this.state.searchActive) {
      this.setState({
        inputText: '',
        searchActive: true
      });
    }
  }

  onInputDismiss = () => {
    this.setState({
      inputText: '',
      searchActive: false
    });
  }

  onInputChange = (event) => {
    if(!event.target.value) {
      this.setState({
        inputText: '',
        searched: []
      });
      return;
    }

    const { autoCompleteDest } = this.props.destStore;

    this.setState({
      inputText: event.target.value,
      searched: autoCompleteDest(event.target.value)
    });
  }

  render() {
    const { destStore } = this.props;
    const { searchActive, searched, inputText } = this.state;

    const { hotDest } = destStore;

    return (
      <div className={classnames('wt-search-wrapper', {'is-searching': searchActive})}>
        <Link to="/plan/create" className="left-wrapper">
        </Link>
        <div className="input-wrapper">
          <div className="icon-search" />
          <input
            value={inputText}
            onClick={this.onInputActive}
            onChange={this.onInputChange}
            className="input-search"
            placeholder="请输入目的地"
          />
        </div>
        <div className="right-wrapper">
          {
            searchActive && 
              <div className="btn-cancel" onClick={this.onInputDismiss}>取消</div> ||
              <div className="icon-me"></div>
          }
        </div>
        <SearchResult
          showPlaceHolder={inputText && !searched.length}
          placeholder="没有了"
          defaultData={hotDest}
          data={searched}
          visible={searchActive} />
      </div>
    );
  }
}