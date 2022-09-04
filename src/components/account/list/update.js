import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import USMUpload from '../../utils/upload';
import moment from 'moment'
import openNotificationWithIcon from '../../../utils/notification';
const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMUpdateAccount = ({visibleUpdate, setVisibleUpdate, data, setData, idSelected}) => {
  const [usmImages, setUsmImages] = useState([])
  const [form] = Form.useForm();
  
  useEffect(() => {
    const dataSelected = data.filter(element => element?.id === idSelected)[0]
    form.setFieldsValue({
      username: dataSelected?.username,
      fullname: dataSelected?.fullname,
      role: dataSelected?.role,
      phone: dataSelected?.phone,
      email: dataSelected?.email,
      ratio_salary: dataSelected?.ratio_salary,
      created_at: dataSelected?.created_at,
      birthday: moment(dataSelected?.birthday, dateFormatList),
      profile: dataSelected?.profile,
      hashed_password: dataSelected?.hashed_password,
      is_disabled: dataSelected?.is_disabled,
    });
    setUsmImages([dataSelected?.avatar])
    // eslint-disable-next-line
  }, [idSelected])

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.avatar = images.default
    } else {
      values.avatar = usmImages[0]
    }
    values.id = idSelected
    values.key = idSelected
    values.birthday = values.birthday._d.toLocaleDateString('en-GB')
    setData(prev => prev.map(element => {
      if (element?.id === idSelected) {
        return values
      } else {
        return element
      }
    }))
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Chỉnh sửa thành công',
      'Hãy kiểm tra lại thông tin vừa chỉnh sửa!'
    )
    document.getElementById("usm-button-update").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy chỉnh sửa',
      'Đã hủy chỉnh sửa thông tin nhân viên!'
    )
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
                name="fullname"
                label="Họ tên"
                rules={[
                  {
                    required: true,
                    message: 'Họ tên không được bỏ trống',
                  },
                ]}
              >
                <Input placeholder="Nhập họ tên"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="avatar"
                label="Ảnh đại diện (Ảnh đầu tiên sẽ được chọn)"
              >
                <USMUpload usmImages={usmImages} setUsmImages={setUsmImages}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Chức vụ"
                rules={[
                  {
                    required: true,
                    message: 'Chức vụ không được để trống ',
                  },
                ]}
              >
                <Select placeholder="Chọn chức vụ" >
                  <Option value="staff">Nhân viên bán hàng</Option>
                  <Option value="admin">Chủ cửa hàng</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ratio_salary"
                label="Hệ số lương"
                rules={[
                  {
                    required: true,
                    message: 'Hệ số lương không được bỏ trống',
                  },
                ]}
              >
                <Input placeholder="Nhập hệ số lương" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: 'Tên đăng nhập không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hashed_password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Mật khẩu không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Số điện thoại không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Địa chỉ Email"
                rules={[
                  {
                    required: true,
                    message: 'Địa chỉ Email không được để trống',
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: 'Ngày sinh không được để trống',
                  },
                ]}
              >
                <DatePicker format={dateFormatList} autocomplete="off" 
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_disabled"
                label="Trạng thái của tài khoản"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Chọn trạng thái của tài khoản" >
                  <Option value="enable">Bình thường</Option>
                  <Option value="disabled">Vô hiệu hóa</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="profile"
                label="Thông tin khác"
              >
                <Input.TextArea rows={4} placeholder="Nhập thông tin khác" />
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