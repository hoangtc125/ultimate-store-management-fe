import { Button, Col, Drawer, Form, Input, Row, Select, Space, Popconfirm } from 'antd';
import React, { useState } from 'react';
import images from '../../../assets/images';
import USMTag from '../../utils/tag';
import USMUpload from '../../utils/upload';
import openNotificationWithIcon from '../../../utils/notification';
const { Option } = Select;

const USMCreateProduct = ({visibleCreate, setVisibleCreate, data, setData}) => {
  const [usmImages, setUsmImages] = useState([])
  const [tags, setTags] = useState([]);

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.images = [images.default]
    } else {
      values.images = usmImages
    }
    values.nickname = tags
    values.id = data[data.length - 1].id + 1
    values.key = data[data.length - 1].id + 1
    setData(prev => [...prev, values])
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Thêm thành công',
      'Sản phẩm được thêm vào cuối danh sách!'
    )
    document.getElementById("usm-button-create").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy thêm sản phẩm',
      'Đã hủy thêm mới sản phẩm!'
    )
  };

  const onClose = () => {
    setVisibleCreate(false);
  };

  return (
    <>
      <Drawer
        title="Thêm sản phẩm mới"
        width={"60%"}
        onClose={onClose}
        visible={visibleCreate}
        placement="right"
        destroyOnClose={false}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Popconfirm
              title="Đồng ý lưu thay đổi?"
              onConfirm={confirm}
              onCancel={cancel}
              placement="bottom"
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button type="primary" htmlType="submit" form='usm-form-create'>
                Hoàn tất
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark
          onFinish={onFinish}
          id="usm-form-create"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  {
                    required: true,
                    message: 'Tên sản phẩm không được bỏ trống',
                  },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="images"
                label="Danh sách ảnh (Có thể chọn nhiều ảnh khác nhau)"
              >
                <USMUpload usmImages={usmImages} setUsmImages={setUsmImages}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Thương hiệu"
              >
                <Input placeholder="Nhập thương hiệu"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[
                  {
                    required: true,
                    message: 'Số lượng không được bỏ trống',
                  },
                ]}
              >
                <Input placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priceIn"
                label="Giá nhập vào"
                rules={[
                  {
                    required: true,
                    message: 'Giá nhập vào không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập giá nhập vào" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priceOut"
                label="Giá bán ra"
                rules={[
                  {
                    required: true,
                    message: 'Giá bán ra không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập giá bán ra" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nickname"
                label="Tên gọi khác"
              >
                <USMTag Tags={[tags, setTags]}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_disabled"
                label="Trạng thái của sản phẩm"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Chọn trạng thái của sản phẩm" >
                  <Option value="enable">Bình thường</Option>
                  <Option value="disabled">Vô hiệu hóa</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" id="usm-button-create">
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default USMCreateProduct;