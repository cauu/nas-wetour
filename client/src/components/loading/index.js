import React from 'react';
import { ActivityIndicator } from 'antd-mobile';

export default ({loading}) => ([
  loading && <div style={{padding: '1rem 0', width: '1.25rem', margin: '0 auto', textAlign: 'center'}}>
    <ActivityIndicator animating />
  </div>,
  !loading &&
    <div style={{color: '#999999', width: '100%', textAlign: 'center', padding: '1rem 0'}}>
      没有更多了
    </div>
]);