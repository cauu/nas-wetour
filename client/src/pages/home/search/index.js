import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './style.less';

export default class Search extends PureComponent {
  state = {
    searchActive: false
  }

  handleInputClick = () => {
    this.setState({
      searchActive: true
    });
  }

  render() {
    const { searchActive } = this.state;

    return (
      <div className={classnames('wt-search-wrapper', {'is-searching': searchActive})}>
        <div className="left-wrapper" />
        <div className="input-wrapper">
          <div className="icon-search" />
          <input
            onClick={this.handleInputClick}
            className="input-search"
            placeholder="请输入目的地、主题"
          />
        </div>
        <div className="right-wrapper">
          {
            searchActive ||
              <div onClick={() => this.setState({ searchActive: false })}>取消</div> &&
              <div>me</div>
          }
        </div>
      </div>
    );
  }
}