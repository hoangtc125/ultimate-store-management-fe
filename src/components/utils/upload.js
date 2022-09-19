import ImgCrop from 'antd-img-crop';
import { PlusOutlined, CameraOutlined } from '@ant-design/icons';
import { Modal, Upload, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import USMCamera from '../camera';
import { dataURLtoFile } from '../../utils/image';

const USMUpload = ({CurrentUser, usmImages, setUsmImages, env}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagesFromCamera, setImagesFromCamera] = useState([])

  useEffect(() => {
    if (usmImages) {
      if (usmImages[0]) {
        let files = []
        for (let i = 0; i < usmImages.length; i++) {
          try {
            let file = dataURLtoFile(usmImages[i]);
            const uploadFile = {
              originFileObj: file,
            }
            files.push(uploadFile)
          }
          catch(err) {
          }
        }
        setFileList(files)
      }
    }
  }, [usmImages])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCameraOk = () => {
    if (imagesFromCamera) {
      if (imagesFromCamera[0]) {
        setUsmImages(prev => [...prev, ...imagesFromCamera])
      }
    }
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
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList)
    let list_images = []
    for (let i = 0; i < newFileList.length; i++) {
      const img = await getBase64(newFileList[i].originFileObj);
      list_images.push(img)
    }
    setUsmImages(list_images)
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
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      <Modal title="Chụp ảnh qua Camera" visible={isModalVisible} onOk={handleCameraOk} onCancel={handleCameraCancel} width={"90%"} destroyOnClose={true}>
        <USMCamera CurrentUser={CurrentUser} setImagesFromCamera={setImagesFromCamera} env={env}/>
      </Modal>
    </div>
  );
};

export default USMUpload;