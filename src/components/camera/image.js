import { Image, Button, Space } from 'antd';
import { VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from 'react';
import listImages from '../../assets/images';


const USMImage = ({loadings, enterLoading, setImages}) => {

  const handleErrorShot = () => {
    document.getElementById("browser-image").firstChild.src = listImages.default
  }

  const handleAdd = () => {
    const image = window.localStorage.getItem("USM_TEMP_IMAGE")
    if (image) {
      setImages(images => [...images, image])
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "48%",
        margin: 10,
        backgroundColor: "",
        minHeight: 300,
        minWidth: 300,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        borderRadius: "10px",
        boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "40%",
          height: "40px",
          margin: "0",
          padding: "0",
          color: "rgba(0,0,0,.85)",
          fontSize: "14px",
          fontVariant: "tabular-nums",
          lineHeight: "1.5715",
          listStyle: "none",
          fontFeatureSettings: "tnum",
          position: "relative",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <VideoCameraOutlined /> 
        <span>Ảnh chụp từ điện thoại</span>
      </Space>
      <Image
        preview={false}
        style={{
          position: "relative",
          padding: 10,
          width: "100%",
          minHeight: "300px",
          borderRadius: "10px",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
        }}
        id="browser-image" src="error"
        onError={() => handleErrorShot()}
      />
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 10,
          width: "80%"
        }}
      >
        <Button type="danger" shape="round" size="large" icon={<VideoCameraAddOutlined />} 
          block loading={loadings[2]} 
          onClick={() => {
            handleAdd()
            enterLoading(2, 300)
          }} 
          style={{
            boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          }}
        >
          Chọn ảnh này
        </Button>
      </Space>
    </div>
  )
}

export default USMImage