import { Button, Col, Drawer, Form, Input, Row, Select, Space, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import USMUpload from '../../utils/upload';
const { Option } = Select;

const USMUpdateAccount = ({visibleUpdate, setVisibleUpdate, data, setData, idSelected}) => {
  const [usmImages, setUsmImages] = useState([])
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      name: data[idSelected]?.name,
      nickname: data[idSelected]?.nickname,
      priceIn: data[idSelected]?.priceIn,
      brand: data[idSelected]?.brand,
      quantity: data[idSelected]?.quantity,
      priceOut: data[idSelected]?.priceOut,
      images: data[idSelected]?.images,
      is_disabled: data[idSelected]?.is_disabled,
    });
    setUsmImages(data[idSelected]?.images)
    // eslint-disable-next-line
  }, [idSelected])

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.images = [images.default]
    } else {
      values.images = usmImages
    }
    values.id = idSelected
    values.key = idSelected
    setData(prev => prev.map((element, id) => {
      if (id === idSelected) {
        return values
      } else {
        return element
      }
    }))
    onClose()
  }

  const confirm = (e) => {
    message.success('Click on Yes');
    document.getElementById("usm-button-update").click()
  };
  
  const cancel = (e) => {
    message.error('Click on No');
  };

  const onClose = () => {
    setVisibleUpdate(false);
  };

  return (
    <>
      <Drawer
        title="Chỉnh sửa tài khoản"
        width={"60%"}
        onClose={onClose}
        visible={visibleUpdate}
        placement="left"
        destroyOnClose={true}
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
              <Button type="primary" htmlType="submit" form='usm-form-update'>
                Hoàn tất
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark
          onFinish={onFinish}
          id="usm-form-update"
          form={form}
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
                <Input placeholder="Nhập tên gọi khác" />
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
          <Button type="primary" htmlType="submit" id="usm-button-update">
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default USMUpdateAccount;