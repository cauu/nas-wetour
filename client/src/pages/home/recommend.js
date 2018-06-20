import React from 'react';

import PlanList from '../plan-list/list';

// const dataSource = [
//   {
//     id: 1,
//     title: '澳大利亚房车自由行',
//     author: '马丁',
//     tags: ['123','421','ewqe','ewq'],
//     startAt: '2018-12-28',
//   },
//   {
//     id: 2,
//     title: '澳大利亚房车自由行',
//     author: '马丁',
//     tags: ['123','421','ewqe','ewq'],
//     startAt: '2018-12-28',
//   },
//   {
//     id: 3,
//     title: '澳大利亚房车自由行',
//     author: '马丁',
//     tags: ['123','421','ewqe','ewq'],
//     startAt: '2018-12-28'
//   }
// ];

const onItemClick  = (item) => {
  console.log('item', item);
}

export default ({dataSource=[]}) => (
  <PlanList type="recommend" onItemClick={onItemClick} dataSource={dataSource}/>
);