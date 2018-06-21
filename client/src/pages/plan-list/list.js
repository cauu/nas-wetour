import React from 'react';
import { Link } from 'react-router-dom';

const OrdinaryItem = ({ id, title, desc, dests, startAt, name, tags, onClick }) => (
  <div className="ordinary-item">
    <Link to={`/plan/detail/${id}`}>
      <div className="outline-wrapper">
        <div className="avatar">
        </div>
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

const RecommendItem = ({ id, title, startAt, name, tags, onClick }) => (
  <div className="recommend-item">
    <Link to={`/plan/detail/${id}`}>
      <div className="outline-wrapper" onClick={onClick}>
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
              <span>#{tag}</span>
            ))
          }
        </div>
      </div>
    </Link>
  </div>
);

export default ({ type='ordinary', dataSource, onItemClick=() => {} }) => (
  <div className="wt-pl-list">
    {
      type === 'recommend' && dataSource.map((data) => (
        <RecommendItem onClick={() => onItemClick(data)} {...data}/>
      )) || dataSource.map((data) => (
        <OrdinaryItem onClick={() => onItemClick(data)} {...data}/>
      ))
    }
  </div>
);