import { Layout } from 'antd';
import React, { useEffect } from 'react';
import USMSideBar from '../components/sideBar'
import USMBody from '../components/body'
import USMFooter from '../components/footer'
import USMBreadcrumb from '../components/breadcrumb';
import { isMode, isVisit } from '../../utils/check';
import { useNavigate } from 'react-router-dom';
import * as MODE from '../../constants/mode'
import * as URL from '../../constants/url'
  
const { Content } = Layout;

const DefaultLayout = ({ Header, Component, Role, Direction, ComponentSize, CurrentUser }) => {
  const navigate = useNavigate(null)
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

  useEffect(() => {
    if (!isVisit(Role)) {
      const role = window.localStorage.getItem("USM_ROLE")
      if (role) {
        navigate(URL.ERROR_404)
      } else {
        navigate(URL.ULTIMATE_STORE_MANAGEMENT)
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(isMode([MODE.NORMAL])) {
      if(!currentUser?.token) {
        navigate(URL.ULTIMATE_STORE_MANAGEMENT)
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <USMSideBar Direction={Direction} ComponentSize={ComponentSize}/>
      <Layout className="site-layout">
        {Header}
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <USMBreadcrumb />
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: "10px",
              boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
            }}
          >
            <USMBody Component={Component}/>
          </div>
        </Content>
        <USMFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout