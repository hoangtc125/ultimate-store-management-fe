  import { Breadcrumb, Layout } from 'antd';
  import React from 'react';
  import USMSideBar from '../components/sideBar'
  import USMHeader from '../components/header'
  import USMBody from '../components/body'
  import USMFooter from '../components/footer'
  
  const { Content } = Layout;
  
  const DefaultLayout = ({ Component}) => {
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <USMSideBar />
        <Layout className="site-layout">
          <USMHeader />
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