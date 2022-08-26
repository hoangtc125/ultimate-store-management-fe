import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Spin, Form, Input, Image } from 'antd';
import React, { useState }from 'react';
import images from '../../../assets/images';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/error')
    }, 500);
  }

  return (
    <Spin size="large" spinning={loading} delay={100}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "65vh",
        }}
      >
        <Image preview={false} src={images.logolong}
          style={{
            width: "90%",
          }}
        />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            width: "40%",
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Tên đăng nhập không được để trống!',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không được để trống!',
              },
            ]}
          >
            <Input size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"
              size="large"
              onClick={() => handleLogin()}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Login;