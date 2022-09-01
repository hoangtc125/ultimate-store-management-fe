import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import * as MODE from '../../../../constants/mode'
import { isMode } from '../../../../utils/check';

const USMLine = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    if(isMode([MODE.TEST])) {
      let fakeData = []
      for (let i = 0; i < 100; i++) {
        fakeData.push({
          Date: 'example ' + i,
          scales: 1000 * Math.random(),
        })
      }
      setData(fakeData)
    }
  }, [])

  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 50,
    },
    slider: {
      start: 0.8,
      end: 1,
    },
  };

  return <Line {...config} 
    style={{
      width: "100%",
    }}
  />;
};

export default USMLine