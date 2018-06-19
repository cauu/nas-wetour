import React from 'react';
import classnames from 'classnames';

const Row = ({children}) => (
  <div className="row">
    {children}
  </div>
);

const Item = ({ children, ...props }) => (
  <div {...props} className="item">
    {children}
  </div>
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
              <Item key={j}>
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