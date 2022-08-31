import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import * as MODE from '../../../../constants/mode'
import { isMode } from '../../../../utils/check';

const USMColumn = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    if(isMode([MODE.TEST])) {
      let fakeData = []
      for (let i = 0; i < 10; i++) {
        fakeData.push({
          type: 'example ' + i,
          sales: 100 * Math.random(),
        })
      }
      setData(fakeData)
    }
  }, [])

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'x',
      },
      sales: {
        alias: 'y',
      },
    },
  };

  return <Column {...config} 
    style={{
      width: "100%",
    }}
  />;
};

export default USMColumn