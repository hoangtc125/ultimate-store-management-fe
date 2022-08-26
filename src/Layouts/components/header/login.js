import { PageHeader, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import images from '../../../assets/images';
const { Paragraph } = Typography;

const IconLink = ({ src, text }) => (
  <a className="example-link" href='/'>
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
);

const content = (
  <>
    <Paragraph>
      Phần mềm chuyển đổi số cho cửa hàng kinh doanh quy mô hộ gia đình 
    </Paragraph>
    <Paragraph>
      Số hóa các chức năng thù công, tích hợp các công nghệ mới, giúp chủ cửa hàng dễ dàng điều hành công việc kinh doanh như: 
      quản lý nhân viên, quản lý sản phẩm, quản lý doanh thu, lên lịch làm việc, thống kê doanh số, tối ưu sắp xếp sản phẩm, ...
    </Paragraph>
    <Space
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="Hướng dẫn cài đặt phần mềm"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text=" Thông tin chi tiết về phần mềm"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
        text="Hướng dẫn sử dụng phần mềm"
      />
    </Space>
  </>
);

const Content = ({ children, extraContent }) => (
  <Row>
    <div
      style={{
        flex: 1,
      }}
    >
      {children}
    </div>
    <div className="image">{extraContent}</div>
  </Row>
);

const USMHeader = () => (
  <PageHeader
    title="Ultimate Store Management"
    className="site-page-header"
    subTitle="Quản lý cửa hàng tối ưu"
    tags={<Tag color="blue">Phát triển bởi <strong>Trần Công Hoàng</strong></Tag>}
    avatar={{
      src: images.logo,
    }}
  >
    <Content
      extraContent={
        <img
          src={images.logo}
          alt="content"
          height={100}
        />
      }
    >
      {content}
    </Content>
  </PageHeader>
);

export default USMHeader;