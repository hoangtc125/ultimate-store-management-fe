import { Tabs } from 'antd';
import React from 'react';
import USMAccountGeneral from './general';
import USMAccountPassword from './password';

const USMAccountDetail = ({CurrentUser, env}) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Chỉnh sửa thông tin chung" key="1">
        <USMAccountGeneral CurrentUser={CurrentUser} env={env}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Chỉnh sửa mật khẩu" key="2">
        <USMAccountPassword currentUser={currentUser} env={env}/>
      </Tabs.TabPane>
    </Tabs>
  )
};

export default USMAccountDetail;