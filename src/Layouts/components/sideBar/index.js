import {
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  FundProjectionScreenOutlined,
  GoldOutlined,
  LineChartOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  PieChartOutlined,
  BulbOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ShopOutlined,
  IdcardOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Switch, Select } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../../constants/url'
import * as ROLE from '../../../constants/role'
import { isRole } from '../../../utils/check';
import images from '../../../assets/images'

const { Sider } = Layout;
const { Option } = Select;

const USMSideBar = ({Direction, ComponentSize}) => {
  const [theme, setTheme] = useState(isRole([ROLE.ADMIN]) ? 'dark' : 'light')
  const [direction, setDirection] = Direction
  const [componentSize, setComponentSize] = ComponentSize

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem(<Link to={URL.HOME}>Trang chủ</Link>, 'home', <HomeOutlined />),
    getItem(<Link to={URL.CART}>Giỏ hàng</Link>, 'cart', <ShoppingCartOutlined />),
    getItem(<Link to={URL.CAMERA}>Kết nối Camera</Link>, 'camera', <VideoCameraOutlined />),
    getItem('Hóa đơn', 'bill', <FileDoneOutlined />, [
      getItem(<Link to={URL.BILL} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Danh sách</span><UnorderedListOutlined /></Link>, 'bill-list'),
    ]),
    getItem('Nhân viên', 'accounts', <UsergroupAddOutlined />, [
      getItem(<Link to={URL.ACCOUNTS} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Danh sách</span><UnorderedListOutlined /></Link>, 'account-list'),
      getItem(<Link to={URL.ACCOUNTS_CALENDAR} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Lịch làm việc</span><CalendarOutlined /></Link>, 'account-calendar'),
    ]),
    getItem('Sản phẩm', 'products', <GoldOutlined />, [
      getItem(<Link to={URL.PRODUCTS} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Danh sách</span><UnorderedListOutlined /></Link>, 'product-list'),
    ]),
    isRole([ROLE.ADMIN]) && getItem('Báo cáo', 'reports', <LineChartOutlined />, [
      getItem(<Link to={URL.CHARTS} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Biểu đồ</span><PieChartOutlined /></Link>, 'report-list'),
    ]), 
    getItem('Giao diện', 'inteface', <FundProjectionScreenOutlined />, [
      getItem('Màu sắc', 'theme', <BulbOutlined />, [
        getItem(<Switch checkedChildren="Chế độ sáng" unCheckedChildren="Chế độ tối" defaultChecked={theme === 'light'} id="theme-check"
          onClick={() => {
            // eslint-disable-next-line
            if(theme == 'dark') {
              setTheme('light')
            } else {
              setTheme('dark')
            }
          }}
          style={{
            width: "100%",
          }}
        />, 'theme-switch'),
      ]),
      getItem('Hướng', 'direction', <SwapOutlined />, [
        getItem(<Switch checkedChildren="Trái sang phải" unCheckedChildren="Phải sang trái" defaultChecked id="direction-check"
          onClick={() => {
            // eslint-disable-next-line
            if(direction == 'rtl') {
              setDirection('ltr')
            } else {
              setDirection('rtl')
            }
          }}
          style={{
            width: "100%",
          }}
        />, 'direction-switch'),
      ]),
      getItem('Độ lớn', 'size', <ZoomInOutlined />, [
        getItem(
          <Select
            labelInValue
            defaultValue={{
              value: componentSize,
            }}
            style={{
              width: "100%",
            }}
            onChange={(value) => setComponentSize(value.value)}
            size="middle"
          >
            <Option value="small">Nhỏ</Option>
            <Option value="middle">Vừa</Option>
            <Option value="large">Lớn</Option>
          </Select>
        , 'size-options'),
      ]),
    ]),
    isRole([ROLE.ADMIN]) && getItem('Cài đặt', 'setting', <SettingOutlined />, [
      getItem(<Link to={URL.SETTING_STORE} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Cửa hàng</span><ShopOutlined /></Link>, 'me-setting'),
    ]),
    getItem('Tài khoản', 'me', <UserOutlined />, [
      getItem(<Link to={URL.ACCOUNT_DETAIL} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Trang cá nhân</span><IdcardOutlined /></Link>, 'me-profile'),
      getItem(<a href={URL.ULTIMATE_STORE_MANAGEMENT} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Đăng xuất</span><LogoutOutlined /></a>, 'me-logout'),
    ]),
  ];

  return (
    <Sider theme={theme}
      style={{
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
        overflow: 'auto',
      }}
    >
      <div className="logo" ><Image src={theme === 'dark' ? images.logolongwhite : images.logolong}/></div>
      <Menu theme={theme} defaultSelectedKeys={['home']} mode="inline" items={items} />
    </Sider>
  );
};

export default USMSideBar