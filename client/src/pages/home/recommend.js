import React from 'react';

import PlanList from '../plan-list/list';

const onItemClick  = (item) => {
  console.log('item', item);
}

export default ({dataSource=[]}) => (
  <PlanList type="recommend" onItemClick={onItemClick} dataSource={dataSource}/>
);