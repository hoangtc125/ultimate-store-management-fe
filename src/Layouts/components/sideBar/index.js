import {
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Switch } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../../constants/url'
import * as ROLE from '../../../constants/role'
import { isRole } from '../../../utils/check';
import images from '../../../assets/images'

const { Sider } = Layout;

const USMSideBar = () => {
  const [theme, setTheme] = useState('light')

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
    isRole([ROLE.ADMIN]) && getItem(<Link to={URL.CAMERA}>Kết nối Camera</Link>, 'camera', <VideoCameraOutlined />),
    getItem('Người dùng', 'accounts', <UsergroupAddOutlined />, [
      getItem(<Link to={URL.ACCOUNTS} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Danh sách</span><UnorderedListOutlined /></Link>, 'account-list'),
    ]),
    getItem('Giao diện', 'inteface', <FundProjectionScreenOutlined />, [
      getItem(<Switch checkedChildren="Chế độ sáng" unCheckedChildren="Chế độ tối" defaultChecked id="theme-check"
      onClick={() => {
        // eslint-disable-next-line
        if(theme == 'dark') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
      />, 'theme')
    ]),
    getItem('Tài khoản', 'me', <UserOutlined />, [
      getItem(<Link to={URL.HOME} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Trang cá nhân</span><UserOutlined /></Link>, 'me-profile'),
      getItem(<Link to={URL.HOME} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Cài đặt</span><SettingOutlined /></Link>, 'me-setting'),
      getItem(<a href={URL.LOGIN} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Đăng xuất</span><LogoutOutlined /></a>, 'me-logout'),
    ]),
  ];

  return (
    <Sider theme={theme}
      style={{
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
        overflow: 'auto',
      }}
    >
      <div className="logo" ><Image src={images.logolong}/></div>
      <Menu theme={theme} defaultSelectedKeys={['home']} mode="inline" items={items} />
    </Sider>
  );
};

export default USMSideBar