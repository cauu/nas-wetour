import React from 'react';

import PlanList from '../plan-list/list';
import Loading from '../../components/loading';

const onItemClick  = (item) => {
  console.log('item', item);
}

export default ({dataSource=[], loading}) => (
  <div>
    <PlanList
      type="recommend"
      onItemClick={onItemClick} 
      dataSource={(dataSource || []).filter((data) => {
        return !!data.recommend;
      })}
      loading={loading}
    />
  </div>
);