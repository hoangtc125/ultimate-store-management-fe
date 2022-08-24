import { Layout } from 'antd';
import React from 'react';
const { Footer } = Layout;

const USMFooter = () => {
  return (
    <Footer
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <span><strong>Ultimate Store Management</strong> ©2022</span>
      <span>Created by <strong>Tran Cong Hoang</strong></span> 
    </Footer>
  )
}

export default USMFooter