import { Button, Form, Input } from 'antd';
import React from 'react';

const USMPassword = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      onFinish={onFinish}
      layout='horizontal'
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        layout='horizontal'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        layout='horizontal'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default USMPassword;