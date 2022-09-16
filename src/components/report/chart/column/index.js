import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import * as MODE from '../../../../constants/mode'
import * as API from '../../../../constants/api'
import openNotificationWithIcon from '../../../../utils/notification';
import { isMode } from '../../../../utils/check';

const USMColumn = ({CurrentUser, env}) => {
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

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
    } else {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.BILL_GET_ALL, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': currentUser.token,
        },
      })
      .then(response => {
        return response.json()})
      .then(data => {
        // eslint-disable-next-line
        if(data?.status_code != 200) {
          openNotificationWithIcon(
            'error',
            'Cập nhật không thành công',
            data?.msg,
          )
        } else {
          const newData = data?.data.map(element => {
            return {
              type: element?.created_at,
              sales: element?.totalPrice,
            }
          })
          setData(newData)
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Cập nhật không thành công',
          'Thông tin không được cập nhật!'
        )
      });
    }
    // eslint-disable-next-line
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