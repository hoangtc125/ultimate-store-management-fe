import { Button, Col, DatePicker, Form, Input, Row, Select, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import images from '../../../../assets/images';
import USMUpload from '../../../utils/upload';
import moment from 'moment'
import openNotificationWithIcon from '../../../../utils/notification';
import * as ROLE from '../../../../constants/role'
import * as API from '../../../../constants/api'
import * as MODE from '../../../../constants/mode'
import { isMode } from '../../../../utils/check';
import { AccountResponse } from '../../../../model/account';
const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMAccountGeneral = ({CurrentUser, env}) => {
  const [usmImages, setUsmImages] = useState([])
  const [currentUser, setCurrentUser] = CurrentUser
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: currentUser?.username,
      fullname: currentUser?.fullname,
      role: currentUser?.role,
      phone: currentUser?.phone,
      email: currentUser?.email,
      ratio_salary: currentUser?.ratio_salary,
      created_at: currentUser?.created_at,
      birthday: moment(currentUser?.birthday, dateFormatList),
      profile: currentUser?.profile,
      password: "",
      is_disabled: currentUser?.is_disabled,
    });
    setUsmImages([currentUser?.avatar])
    // eslint-disable-next-line
  }, [])

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.avatar = images.default
    } else {
      values.avatar = usmImages[0]
    }
    values.id = currentUser.id
    values.birthday = values.birthday._d.toLocaleDateString('en-GB')
    if (isMode([MODE.NORMAL])) {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.ACCOUNT_UPDATE + currentUser.id, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': currentUser.token
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
          const newCurrentUser = new AccountResponse({
            ...values,
            token: currentUser?.token,
          })
          setCurrentUser(newCurrentUser)
          window.localStorage.setItem("USM_USER", JSON.stringify(newCurrentUser))
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
      setCurrentUser(values)
    }
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Chỉnh sửa thành công',
      'Hãy kiểm tra lại thông tin vừa chỉnh sửa!'
    )
    document.getElementById("usm-button-detail").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy chỉnh sửa',
      'Đã hủy chỉnh sửa thông tin!'
    )
  };

  return (
    <>
      <Form layout="vertical" hideRequiredMark
        onFinish={onFinish}
        id="usm-form-detail"
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
              <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
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
              <Select placeholder="Chọn chức vụ" disabled>
                <Option value={ROLE.STAFF}>Nhân viên bán hàng</Option>
                <Option value={ROLE.ADMIN}>Chủ cửa hàng</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <Input placeholder="Nhập hệ số lương" disabled/>
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <Input placeholder="Nhập tên đăng nhập" disabled/>
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
              <Select placeholder="Chọn trạng thái của tài khoản" disabled>
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
        <Popconfirm
          title="Đồng ý lưu thay đổi?"
          onConfirm={confirm}
          onCancel={cancel}
          placement="bottom"
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Button type="primary">
            Lưu thay đổi
          </Button>
        </Popconfirm>
        <Button type="primary" htmlType="submit" id="usm-button-detail">
        </Button>
      </Form>
    </>
  );
};

export default USMAccountGeneral;