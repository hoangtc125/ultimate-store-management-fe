import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import openNotificationWithIcon from '../../../utils/notification';

const USMStore = ({StoreData}) => {
  // eslint-disable-next-line
  const [storeData, setStoreData] = StoreData
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(storeData)
    // eslint-disable-next-line
  }, [])

  const onFinish = (values) => {
    setStoreData(values)
    openNotificationWithIcon(
      "success",
      "Cập nhật thành công",
      "Thông tin cửa hàng đã được thay đổi!",
    )
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
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default USMStore;