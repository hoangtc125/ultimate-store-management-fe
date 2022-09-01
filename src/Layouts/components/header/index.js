import { Statistic, Descriptions, PageHeader, Tag, Image, Space } from 'antd';
import {
  ShoppingCartOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as MODE from '../../../constants/mode'
import images from '../../../assets/images'
import { isMode } from '../../../utils/check';

const fakeData = {
  staff: {
    name: "Trần Công Hoàng",
    id: "20194060",
    start: "28-08-2022",
    end: "02-09-2022",
    avatar: images.default,
  },
  bill: {
    guest: "Tran Cong Hoang",
    id: "421421",
    created_at: "2017-01-10",
    products: "T21, T27, T34",
    status: "Đã thanh toán",
    price: 100000,
    images: [images.default, images.default, images.default],
  }
}

const renderContent = (bill) => (
  <div>
    <Tag color="error" icon={<ShoppingCartOutlined style={{fontSize: "2rem"}}/>}><strong>Giỏ hàng hiện tại</strong></Tag>
    <Descriptions size="small" column={3}>
      <Descriptions.Item label="Khách hàng">{bill?.guest}</Descriptions.Item>
      <Descriptions.Item label="Mã hóa đơn">
        <p>{bill?.id}</p>
      </Descriptions.Item>
      <Descriptions.Item label="Ngày tạo">{bill?.created_at}</Descriptions.Item>
      <Descriptions.Item label="Sản phẩm">
        {bill?.products}
      </Descriptions.Item>
    </Descriptions>
  </div>
);

const extraContent = (bill) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: "100%",
      }}
    >
      <Statistic
        title="Trạng thái"
        value={bill?.status}
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Thành tiền" suffix="VNĐ" value={bill?.price} 
        style={{
          marginRight: 32,
        }}
      />
      <Space>
        {bill?.images.map((image, id) => {
          return <Image src={image} key={id} width={70} />
        })}
      </Space>
    </div>
  )
}

const Content = ({ children, extra }) => (
  <div className="content"
    style={{
      width: "55%",
      marginTop: "-50px",
    }}
  >
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const Header = () => {
  const [data, setData] = useState()

  useEffect(() => {
    if(isMode([MODE.TEST])) {
      setData(fakeData)
    }
  }, [])

  return (
    <div className="site-page-header-ghost-wrapper"
      style={{
        margin: "0px 15px",
      }}
    >
      <PageHeader
        ghost={false}
        title={<Tag color="blue"><strong>{window.localStorage.getItem("USM_MODE")}</strong> - <strong>{window.localStorage.getItem("USM_ROLE")}</strong></Tag>}
        subTitle={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "start",
            }}
          >
            <span>Phần mềm chuyển đổi số cho cửa hàng</span>
            <span>kinh doanh quy mô hộ gia đình {<TrademarkOutlined />}</span>
          </div>
        }
        style={{
          borderRadius: "10px",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "-10px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "45%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Descriptions size="small" column={2}
              style={{
                width: "80%",
              }}
            >
              <Descriptions.Item label="Nhân viên ">{data?.staff?.name}</Descriptions.Item>
              <Descriptions.Item label="Mã nhân viên">
                <p>{data?.staff?.id}</p>
              </Descriptions.Item>
              <Descriptions.Item label="Bắt đầu ca làm">{data?.staff?.start}</Descriptions.Item>
              <Descriptions.Item label="Kết thúc ca làm">{data?.staff?.end}</Descriptions.Item>
            </Descriptions>
            <Image src={data?.staff?.avatar} fallback={images.default} width={80}/>
          </div>
          <Content extra={extraContent(data?.bill)}>
            {renderContent(data?.bill)}
          </Content>
        </div>
      </PageHeader>
    </div>
  )
};

export default Header;