import { Image } from 'antd';
import React, { useState } from 'react';
import USMVideo from './video';
import USMImage from './image';
import USMIntro from './intro';

const USMCamera = () => {
  // eslint-disable-next-line 
  const [ipCamera, setIpCamera] = useState('0.0.0.0')
  const [images, setImages] = useState([])
  const [loadings, setLoadings] = useState([]);

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
      <USMVideo ipCamera={ipCamera} loadings={loadings} enterLoading={enterLoading}/>
      <USMImage loadings={loadings} enterLoading={enterLoading} setImages={setImages}/>
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