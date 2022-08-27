import { Select, Image, Button, message, Steps, Card } from 'antd';
import { useState } from 'react';
import images from '../../assets/images';
const { Option } = Select;
const { Step } = Steps;

const steps = [
  {
    title: 'Bước 1',
    content: 
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100px",
        }}
      >
        <span>Cài đăt phần mềm <strong>IP Camera</strong> từ <strong>CH Play</strong> hoặc <strong>App Store</strong></span>
        <Image src={images.ipcamera} height={100} preview={false}/>
      </div>,
  },
  {
    title: 'Bước 2',
    content: 
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100px",
      }}
    >
      <span>Quét mã <strong>QR sau</strong> và truy cập đường <strong>link</strong> nhận được</span>
      <Image src={images.qrcode} height={150} preview={false}/>
    </div>,
  },
  {
    title: 'Bước 3',
    content: 
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Truy cập <strong>IP Camera</strong>, chọn <strong>Start server</strong></span>
        <span>tại kí hiệu <strong>3 chấm</strong> trên góc phải màn hình</span>
      </div>
      <Image src={images.ipstart} height={130} preview={false}/>
    </div>,
  },
  {
    title: 'Bước 4',
    content: 
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100px",
      }}
    >
      <span>Chọn thiết bị của bạn tại ô <strong>Chọn thiết bị kết nối Camera</strong></span>
      <Image src={images.ipconnect} height={130} preview={false}/>
    </div>,
  },
];

const StepsIntro = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
      }}
    >
      <Card
        title={<strong>Hướng dẫn kết nối sử dụng Camera thiết bị</strong>}
        style={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
        }}
      >
        <div>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Bước sau
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Quá trình kết nối hoàn tất!')}>
                Hoàn thành
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: '0 8px',
                }}
                onClick={() => prev()}
              >
                Bước trước
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const USMIntro = ({ setIpCamera }) => {

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <StepsIntro />
      <Select
        showSearch
        placeholder="Chọn thiết bị kết nối Camera"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        size="large"
        style={{
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          height: "fit-content",
          width: "30%",
        }}
      >
        <Option value="jack">OPPO 11 PRO - Địa chỉ IP 1.1.1.1</Option>
        <Option value="lucy">IPHONE 12 - Địa chỉ IP 2.2.2.2</Option>
        <Option value="tom">SAMSUNG - Địa chỉ IP 3.3.3.3 </Option>
      </Select>
    </div>
  )
}

export default USMIntro