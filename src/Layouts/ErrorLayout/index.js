  import { Breadcrumb, Layout } from 'antd';
  import React from 'react';
  import USMSideBar from '../components/sideBar'
  import USMBody from '../components/body'
  import USMFooter from '../components/footer'
  
  const { Content } = Layout;
  
  const ErrorLayout = ({ Component}) => {
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <USMSideBar />
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

  export default ErrorLayout