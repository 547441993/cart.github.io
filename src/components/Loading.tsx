import React from 'react';
import { Spin } from 'antd';


function Loading() {
  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      top: 0,
      left: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Spin />
    </div>
  );
}

export default Loading;
