import { Layout } from 'antd';
import React from 'react';
import USMHeader from '../components/header/login';
import USMBody from '../components/body'
import USMFooter from '../components/footer'

const { Content } = Layout;

const LoginLayout = ({ Component, Role, Direction, ComponentSize }) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout className="site-layout">
        <USMHeader />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
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

export default LoginLayout