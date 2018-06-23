import React from 'react';
import { Link } from 'react-router-dom';

import { TAGS } from '../../components/tag';
import Loading from '../../components/loading';

const OrdinaryItem = ({ id, title, desc, dests, startAt, name, tags, onClick, imgs }) => (
  <div className="ordinary-item">
    <Link to={`/plan/detail/${id}`}>
      <div className="outline-wrapper">
        <div style={{backgroundImage: `url("${imgs && imgs[0] || ''}")`}} className="avatar" />
      </div>
      <div className="detail-wrapper" onClick={onClick}>
        <div className="author">
          {name}
        </div>
        <div className="dest">
          {`${dests} | ${startAt}`}
        </div>
        <div className="desc">
          {desc}
        </div>
      </div>
    </Link>
  </div>
);

const RecommendItem = ({ id, title, startAt, name, dests, tags, imgs, onClick }) => (
  <div className="recommend-item">
    <Link to={`/plan/detail/${id}`}>
      <div className="outline-wrapper" onClick={onClick}>
        <div style={{backgroundImage: `url("${imgs && imgs[0] || ''}")`}} className="cover" />
        <div className="title">
          {title}
        </div>
        <div className="tag">
          {startAt}
        </div>
      </div>
      <div className="detail-wrapper">
        <div className="author">
          <span>By </span>
          <span>{name}</span>
        </div>
        <div className="tags">
          {
            tags && tags.map((tag) => (
              <span> #{TAGS[tag]} </span>
            ) || []).concat(dests && dests.map((dest) => (
              <span> #{dest} </span>
            )) || [])
          }
        </div>
      </div>
    </Link>
  </div>
);

export default ({ type='ordinary', dataSource, onItemClick=() => {}, loading }) => (
  <div className="wt-pl-list">
    {
      type === 'recommend' && dataSource.map((data, index) => (
        <RecommendItem key={index} onClick={() => onItemClick(data)} {...data}/>
      )) || dataSource.map((data, index) => (
        <OrdinaryItem key={index} onClick={() => onItemClick(data)} {...data}/>
      ))
    }
    <Loading loading={loading} />
  </div>
);