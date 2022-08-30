import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import USMVideo from './video';
import USMImage from './image';
import USMIntro from './intro';

const USMCamera = ({setImagesFromCamera}) => {
  // eslint-disable-next-line 
  const [ipCamera, setIpCamera] = useState(window.localStorage.getItem("USM_IP_CAMERA"))
  const [images, setImages] = useState([])
  const [loadings, setLoadings] = useState([]);

  useEffect(() => {
    if (setImagesFromCamera) {
      setImagesFromCamera(images)
    }
    // eslint-disable-next-line
  }, [images])

  const enterLoading = (index, timeout) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, timeout);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }}>
      <USMIntro setIpCamera={setIpCamera}/>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "10px 0px 10px",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <USMVideo ipCamera={ipCamera} loadings={loadings} enterLoading={enterLoading}/>
        <USMImage loadings={loadings} enterLoading={enterLoading} setImages={setImages}/>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {images.map((image, id) => {
          return (<Image
            key={id}
            width={200}
            style={{
              padding: "10px",
            }}
            src={image}
          />)
        })}
      </div>
    </div>
  );
}

export default USMCamera;