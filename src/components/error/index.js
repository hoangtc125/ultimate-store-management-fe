import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const USMError = () => {
  const navigate = useNavigate(null)  

  return (
    <Result
      status="404"
      title="404"
      subTitle="Lỗi không tìm thấy trang, hãy quay lại trang trước!"
      style={{
        height: "80vh",
      }}
      extra={
        <Button type="primary"
          onClick={() => {
            navigate(-1)
          }}
        >
          Trở về
        </Button>
      }
    />
  )
;}

export default USMError;