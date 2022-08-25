import { Layout, Image } from 'antd';
import React from 'react';
import images from '../../../assets/images'
const { Footer } = Layout;

const USMFooter = () => {
  return (
    <Footer
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "15px 15px 0px",
        borderRadius: "10px",
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
      }}
    >
      <span><strong>Ultimate Store Management</strong> ©2022</span>
      <Image src={images.logo} preview={false} height={30}/>
      <span>Created by <strong>Tran Cong Hoang</strong></span> 
    </Footer>
  )
}

export default USMFooter