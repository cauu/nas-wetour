import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd-mobile';

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