import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import * as MODE from '../../../../constants/mode'
import { isMode } from '../../../../utils/check';

const USMPie = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    if(isMode([MODE.TEST])) {
      let fakeData = []
      for (let i = 0; i < 10; i++) {
        fakeData.push({
          type: 'example ' + i,
          value: 100 * Math.random(),
        })
      }
      setData(fakeData)
    }
  }, [])

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return <Pie {...config} 
    style={{
      width: "100%",
    }}
  />;
};

export default USMPie