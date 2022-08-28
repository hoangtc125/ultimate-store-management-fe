import { Image, Button, Space, message } from 'antd';
import { ReloadOutlined, CameraOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import openNotificationWithIcon from '../../utils/notification';
import listImages from '../../assets/images';


const USMVideo = ({ipCamera, loadings, enterLoading}) => {

  const handleReconect = () => {
    document.getElementById("browser-video").firstChild.src = "http://" + ipCamera + ":8080/video"
  }

  useEffect(() => {
    document.getElementById("browser-video").firstChild.src = "http://" + ipCamera + ":8080/video"
  }, [ipCamera])

  const handleErrorVideo = () => {
    document.getElementById("browser-video").firstChild.src = listImages.default
    message.error('Không thể kết nối Camera')
  }

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }

  const handleShotImage = () => {
    getBase64FromUrl("http://" + ipCamera + ":8080/photo.jpg")
      .then(res => {
        document.getElementById("browser-image").firstChild.src = res
        window.localStorage.setItem("USM_TEMP_IMAGE", res)
      })
      .catch(e => {
        openNotificationWithIcon(
          'error',
          'Chụp không thành công',
          'Lỗi có thể do mất kết nối với Camera, hãy kết nối lại!'
        )
      })
  }
  
  return (
    <div
      style={{
        position: "relative",
        width: "49%",
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
        <span>Màn hình trực tuyến</span>
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
          id="browser-video" src={"http://" + ipCamera + ":8080/video"}
          onError={() => handleErrorVideo()}
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
        <Button type="primary" icon={<ReloadOutlined />} shape="round" size="large" block loading={loadings[0]} 
          onClick={() => {
            handleReconect()
            enterLoading(0, 1000)
          }}
          style={{
            boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          }}
        
        >
          Kết nối lại
        </Button>
        <Button type="primary" shape="round" size="large" block loading={loadings[1]} 
          icon={<CameraOutlined />}
          onClick={() => {
            handleShotImage()
            enterLoading(1, 500)
          }}
          style={{
            boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          }}  
        >
          Chụp ảnh
        </Button>
      </Space>
    </div>
  )
}

export default USMVideo