import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import USMBody from '../components/body'
import USMFooter from '../components/footer'

const { Content } = Layout;

const LoginLayout = ({ Component}) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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