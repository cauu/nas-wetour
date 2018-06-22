import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Carousel } from 'antd-mobile';
import { Fill } from 'react-slot-fill';

import Tag from '../../components/tag';

import defaultImg from './empty.jpg';

import './style.less';

/**
 * @desc 根据type决定调用的函数
 */
@inject('planStore')
@observer
class PlanDetail extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const { id } = props.match.params;

    this.props.planStore.getPlanById(id);
  }

  render() {
    const { planStore } = this.props;
    const { currPlan } = planStore;

    const tags = currPlan.tags || [];

    const hasTag = (type) => tags.indexOf(type) !== -1;

    return (
      <div className="plan-detail-wrapper">
        <Fill name="TitleBar.Title">
          <div>详情</div>
        </Fill>
        <Carousel 
          autoplay
          infinite
        >
        {
          ((currPlan && currPlan.imgs) 
              || [defaultImg]).map((img) => {
            return (
              <a
              style={{ display: 'inline-block', width: '100%', height: '60vw'}}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onError={(e)=>{e.target.src=defaultImg}}
                />
              </a>
            );
          })
        }
        </Carousel>
        <div className="content-wrapper">
          <div className="row title">
            {currPlan.title}
          </div>
          <div className="row">
            <span className={`gender male`}></span>
            <span className="name">{currPlan.name}</span>
          </div>
          <div className="row">
            <span className="contact">{`联系方式: ${currPlan.contact}`}</span>
          </div>
          <div className="row date">
            <span>出发/结束日期</span>
            <span>{`${currPlan.startAt}/${currPlan.endAt}`}</span>
          </div>
          {
            tags.length && <div className="row tag">
              { hasTag('vehicle') && <Tag text="拼车" type="vehicle" /> }
              { hasTag('house') && <Tag text="拼房" type="house" /> }
              { hasTag('boat') && <Tag text="拼船" type="boat" /> }
            </div>
          }
          <div className="row desc">
            <div className="desc-title">行程简介</div>
            <div className="desc-subtitle">Description</div>
            <div className="desc-detail">
              {currPlan.desc}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanDetail;