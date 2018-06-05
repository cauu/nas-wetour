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

export default ({ visible }) => (
  <div className={classnames('wt-search-result-wrapper', {'visible': visible })}>
    <Row>
      <Item>
        test
      </Item>
    </Row>
  </div>
);