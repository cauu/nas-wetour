import React from 'react';
import Tag, { TAGS } from '../../components/tag';

export default ({ history }) => (
  <div className="tag-wrapper">
    <Tag type="vehicle" text={TAGS.vehicle} onClick={() => history.push('/plan/tag/vehicle')} />

    <Tag type="house" text={TAGS.house} onClick={() => history.push('/plan/tag/house')} />

    <Tag type="boat" text={TAGS.boat} onClick={() => history.push('/plan/tag/boat')} />
  </div>
);
