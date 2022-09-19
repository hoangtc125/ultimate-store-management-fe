import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Spin, Form, Input, Image, Carousel, Modal, Radio } from 'antd';
import React, { useEffect, useState }from 'react';
import images from '../../../assets/images';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import * as URL from '../../../constants/url'
import cart from '../../../data/cart'
import bills from '../../../data/bill'
import admin from '../../../data/account/admin'
import staff from '../../../data/account/staff'
import store from '../../../data/store';
import billRelation from '../../../data/billRelation';
import { useNavigate } from 'react-router-dom';
import openNotificationWithIcon from '../../../utils/notification';
import * as API from '../../../constants/api'
import { AccountResponse } from '../../../model/account';
import Cart from '../../../model/cart';

const Advertise = () => {
  return (
    <Carousel
      autoplay
      style={{
        width: "50vw",
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={images.logo} preview={false}/>
      <Image src={images.logolong} preview={false}/>
    </Carousel>
  );
};

const Login = ({ CartData, CurrentUser, BillData, StoreData, env, BillRelationData }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRoles] = useState(ROLE.ADMIN);
  // eslint-disable-next-line
  const [cartData, setCartData] = CartData
  // eslint-disable-next-line
  const [billData, setBillData] = BillData
  // eslint-disable-next-line
  const [billRelationData, setBillRelationData] = BillRelationData
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  // eslint-disable-next-line
  const [storeData, setStoreData] = StoreData
  const navigate = useNavigate()

  useEffect(() => {
    window.localStorage.removeItem("USM_MODE")
    window.localStorage.removeItem("USM_ROLE")
    window.localStorage.removeItem("USM_USER")
    window.localStorage.removeItem("USM_CART")
    window.localStorage.removeItem("USM_STORE")
    window.localStorage.removeItem("USM_BILL")
    window.localStorage.removeItem("USM_BILL_RELATION")
    window.localStorage.removeItem("USM_TEMP_IMAGE")
    window.localStorage.removeItem("USM_IP_CAMERA")
  }, [])

  const onFinish = (values) => {
    window.localStorage.setItem("USM_MODE", MODE.NORMAL)
    setLoading(true)
    fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.LOGIN, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`,
    })
    .then(response => {
      return response.json()})
    .then(data => {
      // eslint-disable-next-line
      if(data?.status_code == 1001) {
        openNotificationWithIcon(
          'error',
          'Đăng nhập thất bại',
          data?.msg,
        )
      } else {
        const newCurrentUser = new AccountResponse({
          ...data?.account,
          token: data?.token_type + ' ' + data?.access_token
        })
        setCurrentUSer(newCurrentUser)
        setCartData(new Cart({}))
        setStoreData(data?.store)
        window.localStorage.setItem("USM_USER", JSON.stringify(newCurrentUser))
        window.localStorage.setItem("USM_ROLE", newCurrentUser?.role)
        window.localStorage.setItem("USM_CART", JSON.stringify(new Cart({})))
        window.localStorage.setItem("USM_STORE", JSON.stringify(store))
        navigate(URL.HOME)
      }
      setLoading(false)
    })
    .catch((error) => {
      openNotificationWithIcon(
        'error',
        'Đăng nhập thất bại',
        'Hãy chọn dùng thử sản phẩm để trải nghiệm!'
      )
      setLoading(false)
    });
  };

  const onChange = (e) => {
    setRoles(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(true)
    window.localStorage.setItem("USM_MODE", MODE.TEST)
    window.localStorage.setItem("USM_ROLE", role)
    window.localStorage.setItem("USM_USER", role === ROLE.ADMIN ? JSON.stringify(admin) : JSON.stringify(staff))
    window.localStorage.setItem("USM_CART", JSON.stringify(cart))
    window.localStorage.setItem("USM_BILL", JSON.stringify(bills))
    window.localStorage.setItem("USM_BILL_RELATION", JSON.stringify(billRelation))
    window.localStorage.setItem("USM_STORE", JSON.stringify(store))
    setCartData(cart)
    setStoreData(store)
    setBillData(bills)
    setBillRelationData(billRelation)
    setCurrentUSer(role === ROLE.ADMIN ? admin : staff)
    setTimeout(() => {
      navigate(URL.HOME)
    }, 500);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Spin spinning={loading}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "65vh",
        }}
      >
        <Advertise />
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
            <div style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Button type="primary" htmlType="submit" className="login-form-button" size="large" loading={loading}>
                Đăng nhập
              </Button>
              <Button type="secondary" className="login-form-button" size="large"
                onClick={showModal}
                loading={loading}
              >
                Dùng thử sản phẩm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Modal title="Hãy chọn chức vụ muốn dùng thử" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Xác nhận" cancelText="Hủy">
        <Radio.Group buttonStyle="solid" onChange={onChange} value={role}>
          <Radio.Button value={ROLE.ADMIN}>Quản trị cửa hàng</Radio.Button>
          <Radio.Button value={ROLE.STAFF}>Nhân viên bán hàng</Radio.Button>
        </Radio.Group>
      </Modal>
    </Spin>
  );
};

export default Login;