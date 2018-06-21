import React from 'react';

import './style.less';

export const TAGS = {
  vehicle: '拼车',
  house: '拼房',
  boat: '拼船'
};

/**
 * @desc type can be vehicle, house, boat
 */
export default ({ type, text, onClick }) => (
  <div className="btn-tag" onClick={() => onClick && onClick(type)}>
    <div className={`icon ${type}`}>
    </div>
    <div className="text">
      {text}
    </div>
  </div>
)