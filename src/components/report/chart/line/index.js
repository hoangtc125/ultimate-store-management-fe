import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import * as MODE from '../../../../constants/mode'
import * as API from '../../../../constants/api'
import openNotificationWithIcon from '../../../../utils/notification'
import { isMode } from '../../../../utils/check';

const USMLine = ({CurrentUser, env}) => {
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

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
              Date: element?.created_at,
              scales: element?.totalPrice,
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
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 50,
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <Line {...config} 
      style={{
        width: "100%",
      }}
    />
  )
};

export default USMLine