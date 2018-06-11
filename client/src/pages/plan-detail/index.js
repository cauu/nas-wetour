import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd-mobile';
import { Fill } from 'react-slot-fill';

/**
 * @desc 根据type决定调用的函数
 */
class PlanDetail extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <div>
        <Fill name="TitleBar.Title">
          <div>详情</div>
        </Fill>
        <Carousel 
          autoplay
          infinite
        >
        </Carousel>
        {JSON.stringify('plandetail')}
      </div>
    );
  }
}

export default PlanDetail;