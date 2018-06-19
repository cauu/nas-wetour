import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Row = ({children}) => (
  <div className="row">
    {children}
  </div>
);

const Item = ({ to, children, ...props }) => (
  <Link to={to} {...props} className="item">
    {children}
  </Link>
);

const renderItemList = (list=[]) => (
  list.map((d, i) => (
    <Row key={i}>
      <div className="header-wrapper">
        <span className="text">
          {d.name}
        </span>
      </div>
      <div className="item-wrapper">
        {
          d.children.map((c, j) => {
            return (
              <Item to={`/plan/dest/${c.name}`} key={j}>
                {c.name}
              </Item>
            );
          })
        }
      </div>
    </Row>
  ))
);

export default ({ placeholder="", defaultData=[], data, visible, showPlaceHolder }) => (
  <div className={classnames('wt-search-result-wrapper', {'visible': visible })}>
    {showPlaceHolder && placeholder}
    {(!data || !data.length) && renderItemList(defaultData)}
    {data && data.length > 0 && renderItemList(data)}
  </div>
);