import { Image, Button, message, Steps, Card, Alert } from 'antd';
import { useState } from 'react';
import images from '../../assets/images';
import USMIP from './ip';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;

const steps1 = [
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

const steps2 = [
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
      <span>Lấy mã số <strong>IPv4</strong> bên dưới màn hình thiết bị đang sử dụng <strong>IP Camera</strong>, ví dụ: 192.168.1.222</span>
      <Image src={images.ipv4} height={100} preview={false}/>
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
      <span>Chọn ô <strong>Chọn thiết bị kết nối Camera</strong> và thêm mới mã số vừa lấy được</span>
      <Image src={images.ipinput} height={130} preview={false}/>
    </div>,
  },
  {
    title: 'Bước 5',
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
      <span>Trong ô <strong>Chọn thiết bị kết nối Camera</strong>, chọn mã số bạn vừa thêm mới</span>
      <Image src={images.ipchoose} height={130} preview={false}/>
    </div>,
  },
];

const StepsIntro = () => {
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);

  const next1 = () => {
    setCurrent1(current1 + 1);
  };

  const prev1 = () => {
    setCurrent1(current1 - 1);
  };

  const next2 = () => {
    setCurrent2(current2 + 1);
  };

  const prev2 = () => {
    setCurrent2(current2 - 1);
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
        <Tabs defaultActiveKey="2"
          style={{
            marginTop: "-20px"
          }}
        >
          <TabPane tab="Cách 1: Kết nối tự động quét mã QR" key="1">
            <div>
              <Steps current={current1}>
                {steps1.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps1[current1].content}</div>
              <div className="steps-action">
                {current1 < steps1.length - 1 && (
                  <Button type="primary" onClick={() => next1()}
                    style={{
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                  >
                    Bước sau
                  </Button>
                )}
                {current1 === steps1.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Quá trình kết nối hoàn tất!')}
                    style={{
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                  >
                    Hoàn thành
                  </Button>
                )}
                {current1 > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                    onClick={() => prev1()}
                  >
                    Bước trước
                  </Button>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Cách 2: Thêm thiết bị thủ công bằng tay" key="2">
          <div>
              <Steps current={current2}>
                {steps2.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps2[current2].content}</div>
              <div className="steps-action">
                {current2 < steps2.length - 1 && (
                  <Button type="primary" onClick={() => next2()}
                    style={{
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                  >
                    Bước sau
                  </Button>
                )}
                {current2 === steps2.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Quá trình kết nối hoàn tất!')}
                    style={{
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                  >
                    Hoàn thành
                  </Button>
                )}
                {current2 > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                      boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
                    }}
                    onClick={() => prev2()}
                  >
                    Bước trước
                  </Button>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

const USMIntro = ({ setIpCamera, env }) => {

  return (
    <div
      style={{
        width: "100%",
        margin: " 0px 0px 10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <StepsIntro/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "35%",
        }}
      >
        <USMIP setIpCamera={setIpCamera} env={env}/>
        <Alert
          message="Chú ý"
          description="Thiết bị sử dụng Camera của bạn và máy tính này cần kết nối chung trong 1 mạng (Mạng Wifi hoặc mạng Lan)"
          type="info"
          style={{
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          }}
          showIcon
        />
      </div>
    </div>
  )
}

export default USMIntro