import ImgCrop from 'antd-img-crop';
import { PlusOutlined, CameraOutlined } from '@ant-design/icons';
import { Modal, Upload, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import USMCamera from '../camera';
import urltoFile from '../../utils/dataURLToFile';

const USMUpload = ({maxCount, usmImages, setUsmImages}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (usmImages) {
      // setFileList(usmImages)
      urltoFile(usmImages[0], 'hello.png', 'data/image').then(function(file){ setFileList([file]);});
    }
  }, [usmImages])

  useEffect(() => {
    console.log(fileList)
  }, [fileList])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCameraOk = () => {
    setIsModalVisible(false);
  };

  const handleCameraCancel = () => {
    setIsModalVisible(false);
  };

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setUsmImages(newFileList)
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Chọn ảnh
      </div>
    </div>
  );

  const ShotButton = (
    <div
      onClick={() => {
        showModal()
      }}
      style={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <CameraOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Chụp ảnh
      </div>
    </div>
  );

  return (
    <div id="upload-container">
      <Space>
        <ImgCrop>
          <Upload
            action={getBase64}
            listType="picture-card"
            fileList={fileList}
            maxCount={maxCount || 1}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </ImgCrop>
        <ImgCrop>
          <Upload
            listType="picture-card"
            openFileDialogOnClick={false}
          >
            {fileList.length >= 8 ? null : ShotButton}
          </Upload>
        </ImgCrop>
      </Space>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      <Modal title="Chụp ảnh qua Camera" visible={isModalVisible} onOk={handleCameraOk} onCancel={handleCameraCancel} width={"85vw"} destroyOnClose={true}>
        <USMCamera />
      </Modal>
    </div>
  );
};

export default USMUpload;