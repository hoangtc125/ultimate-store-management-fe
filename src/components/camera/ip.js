import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { isMode } from '../../utils/check';
import * as MODE from '../../constants/mode'
const { Option } = Select;
let index = 0;

const USMIP = ({setIpCamera}) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setItems([
        "OPPO 11 PRO - Địa chỉ IP 1.1.1.1",
        "IPHONE 12 - Địa chỉ IP 2.2.2.2",
        "SAMSUNG - Địa chỉ IP 3.3.3.3",
        window.localStorage.getItem("USM_IP_CAMERA") ? window.localStorage.getItem("USM_IP_CAMERA") : '',
      ])
    }
  }, [])

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
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
      defaultValue={window.localStorage.getItem("USM_IP_CAMERA")}
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
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );
};

export default USMIP;