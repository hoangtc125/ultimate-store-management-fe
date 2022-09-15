import { Button, Form, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import { isMode } from '../../../utils/check'
import openNotificationWithIcon from '../../../utils/notification';
import Store from '../../../model/store';

const USMStore = ({StoreData, CurrentUser, env}) => {
  // eslint-disable-next-line
  const [storeData, setStoreData] = StoreData
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(storeData)
    // eslint-disable-next-line
  }, [])

  const onFinish = (values) => {
    if(isMode([MODE.TEST])) {
      setStoreData(values)
      openNotificationWithIcon(
        "success",
        "Cập nhật thành công",
        "Thông tin cửa hàng đã được thay đổi!",
      )
    } else {
      setLoading(true)
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.STORE_UPDATE, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': currentUser.token
        },
        body: JSON.stringify(values),
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
          const newStore = new Store({
            ...data?.data
          })
          setStoreData(newStore)
          openNotificationWithIcon(
            "success",
            "Cập nhật thành công",
            "Thông tin cửa hàng đã được thay đổi!",
          )
        }
        setLoading(false)
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Lỗi hệ thống!',
        )
        setLoading(false)
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Spin spinning={loading}>
        <Form
          name="usm-store"
          onFinish={onFinish}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          style={{
            width: "80%",
          }}
          form={form}
        >
          <Form.Item
            label="Tên cửa hàng"
            name="name"
            rules={[
              {
                required: true,
                message: 'Tên cửa hàng không được để trống!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chủ cửa hàng"
            name="owner"
            rules={[
              {
                required: true,
                message: 'Chủ cửa hàng không được để trống!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Liên hệ"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Liên hệ không được để trống!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Địa chỉ không được để trống!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default USMStore;