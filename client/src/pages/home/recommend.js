import React from 'react';

import PlanList from '../plan-list/list';

const dataSource = [
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28',
  },
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28',
  },
  {
    title: '澳大利亚房车自由行',
    author: '马丁',
    tags: ['123','421','ewqe','ewq'],
    startAt: '2018-12-28'
  }
];

const onItemClick  = () => {
}

export default () => (
  <PlanList type="recommend" onItemClick={onItemClick} dataSource={dataSource}/>
);