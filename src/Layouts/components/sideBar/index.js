import {
  VideoCameraOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Switch } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../../constants/url'
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
    getItem(<Link to={URL.CAMERA}>Kết nối Camera</Link>, 'camera', <VideoCameraOutlined />),
    getItem('Người dùng', 'user', <UserOutlined />, [
      getItem(<Link to={URL.HOME} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Trang cá nhân</span><UserOutlined /></Link>, 'user-profile'),
      getItem(<Link to={URL.HOME} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Cài đặt</span><SettingOutlined /></Link>, 'user-setting'),
      getItem(<Link to={URL.LOGIN} style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}><span>Đăng xuất</span><LogoutOutlined /></Link>, 'user-logout'),
    ]),
    getItem(<Switch checkedChildren="Giao diện sáng" unCheckedChildren="Giao diện tối" defaultChecked id="theme-check"
      onClick={() => {
        // eslint-disable-next-line
        if(theme == 'dark') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    />, 'theme')
  ];

  return (
    <Sider theme={theme}
      style={{
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
      }}
    >
      <div className="logo" ><Image src={images.logolong}/></div>
      <Menu theme={theme} defaultSelectedKeys={['home']} mode="inline" items={items} />
    </Sider>
  );
};

export default USMSideBar