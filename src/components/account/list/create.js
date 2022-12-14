import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Popconfirm } from 'antd';
import React, { useState } from 'react';
import images from '../../../assets/images';
import USMUpload from '../../utils/upload';
import openNotificationWithIcon from '../../../utils/notification';
import * as ROLE from '../../../constants/role'
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import { isMode } from '../../../utils/check';
import { AccountResponse } from '../../../model/account';
const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMCreateAccount = ({CurrentUser, visibleCreate, setVisibleCreate, data, setData, env}) => {
  const [usmImages, setUsmImages] = useState([])
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.avatar = images.default
    } else {
      values.avatar = usmImages[0]
    }
    values.id = data[data.length - 1].id + 1
    values.key = data[data.length - 1].id + 1
    values.birthday = values.birthday._d.toLocaleDateString('en-GB')
    if (isMode([MODE.NORMAL])) {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.ACCOUNT_CREATE, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        return response.json()})
      .then(data => {
        // eslint-disable-next-line
        if(data?.status_code != 200) {
          openNotificationWithIcon(
            'error',
            'Cập nhật không thành công',
            data?.msg,
          )
        } else {
          const newAccountResponse = new AccountResponse({
            key: data?.data?.id,
            ...data?.data,
          })
          setData(prev => [...prev, newAccountResponse])
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Cập nhật không thành công',
          'Thông tin không được cập nhật!'
        )
      });
    } else {
      setData(prev => [...prev, values])
    }
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Thêm thành công',
      'Nhân viên mới sẽ xuất hiện cuối danh sách!'
    )
    document.getElementById("usm-button-create").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy thêm nhân viên',
      'Đã hủy thêm nhân viên mới!'
    )
  };

  const onClose = () => {
    setVisibleCreate(false);
  };

  return (
    <>
      <Drawer
        title="Thêm tài khoản mới"
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
                <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
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
                  <Option value={ROLE.STAFF}>Nhân viên bán hàng</Option>
                  <Option value={ROLE.ADMIN}>Chủ cửa hàng</Option>
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
                name="password"
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
              >
                <Select placeholder="Chọn trạng thái của tài khoản" defaultValue={false} disabled>
                  <Option value={false}>Bình thường</Option>
                  <Option value={true}>Vô hiệu hóa</Option>
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
          <Button type="primary" htmlType="submit" id="usm-button-create">
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default USMCreateAccount;