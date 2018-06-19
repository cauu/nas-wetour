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

export default ({ data, visible }) => (
  <div className={classnames('wt-search-result-wrapper', {'visible': visible })}>
    {
      (data || []).map((d, i) => (
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
    }
  </div>
);