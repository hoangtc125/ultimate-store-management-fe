import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { isMode } from '../../utils/check';
import * as MODE from '../../constants/mode'
import * as API from '../../constants/api'
import * as SOCKET_EVENT from '../../constants/socket_event'
import io from 'socket.io-client';
const { Option } = Select;
let index = 0;

const USMIP = ({currentUser, ipCamera, setIpCamera, env}) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  // eslint-disable-next-line
  const [socket, setSocket] = useState(io(API.SOCKET + env.REACT_APP_BACKEND_PORT, {path: env.REACT_APP_SOCKET_HANDSHAKE, transports: ['websocket']}))

  useEffect(() => {
    socket.on(SOCKET_EVENT.CAMERA, (data) => {
      const newItems = data?.device.map(element => {
        return {
          ip: element?.ip,
          name: element?.fullname || currentUser.fullname
        }
      })
      setItems(newItems)
      setIpCamera(data?.ip)
    });

    return () => {
      socket.off(SOCKET_EVENT.CAMERA);
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setItems([
        {
          ip: "1.1.1.1",
          name: "OPPO 11 PRO"
        },
        {
          ip: "2.2.2.2",
          name: "IPHONE 12"
        },
        {
          ip: "3.3.3.3",
          name: "SAMSUNG"
        },
        window.localStorage.getItem("USM_IP_CAMERA") ? {
          ip: window.localStorage.getItem("USM_IP_CAMERA"),
          name: currentUser.fullname
        } : {
          ip: 'Online',
          name: 'Online - Ivideon.com'
        },
      ])
    } else {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.CAMERA_SELECT, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': currentUser.token
        },
      })
      .then(response => {
        return response.json()})
      .then(data => {
        const newItems = data?.data.map(element => {
          return {
            ip: element.ip,
            name: element.fullname
          }
        })
        setItems(newItems)
      })
      .catch((error) => {console.log(error)})
    }
    // eslint-disable-next-line
  }, [])

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, {ip: name, name: currentUser.fullname} || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{
        width: "100%",
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
      }}
      placeholder="Chọn thiết bị kết nối Camera"
      onChange={(value) => {
        window.localStorage.setItem("USM_IP_CAMERA", value)
        setIpCamera(value)
      }}
      defaultValue={window.localStorage.getItem("USM_IP_CAMERA") || "Online"}
      dropdownRender={(menu) => (
        <div
          style={{
            width: "100%",
          }}
        >
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <div
            style={{
              padding: '0 8px 4px',
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input
              placeholder="Nhập IP của thiết bị"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              style={{
                width: "100%"
              }}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Thêm mới
            </Button>
          </div>
        </div>
      )}
    >
      {items.map((item) => (
        <Option key={item.ip}>{item.ip + ' - ' + item.name}</Option>
      ))}
    </Select>
  );
};

export default USMIP;