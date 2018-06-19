import React from 'react';

const OrdinaryItem = ({ title, desc, dests, startAt, author, tags, onClick }) => (
  <div className="ordinary-item">
    <div className="outline-wrapper">
      <div className="avatar">
      </div>
    </div>
    <div className="detail-wrapper" onClick={onClick}>
      <div className="author">
        {author}
      </div>
      <div className="dest">
        {`${dests} | ${startAt}`}
      </div>
      <div className="desc">
        {desc}
      </div>
    </div>
  </div>
);

const RecommendItem = ({ title, startAt, author, tags, onClick }) => (
  <div className="recommend-item">
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
        <span>{author}</span>
      </div>
      <div className="tags">
        {
          tags && tags.map((tag) => (
            <span>#{tag}</span>
          ))
        }
      </div>
    </div>
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