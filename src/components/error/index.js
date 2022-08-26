import { Button, Result } from 'antd';
import React from 'react';

const USMError = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    style={{
      height: "80vh",
    }}
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default USMError;