import React from 'react';

const Item = ({ title, startAt, author, tags }) => (
  <div className="item">
    <div className="outline-wrapper">
      <div className="title">
        {title}
      </div>
      <div className="time-tag">
        {startAt}
      </div>
    </div>
    <div className="detail-wrapper">
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
  </div>
);

export default ({ dataSource }) => (
  <div className="wt-pl-list">
    {
      dataSource.map((data) => (
        <Item {...data}/>
      ))
    }
  </div>
);