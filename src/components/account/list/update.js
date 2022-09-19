import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Popconfirm, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import USMUpload from '../../utils/upload';
import moment from 'moment'
import openNotificationWithIcon from '../../../utils/notification';
import * as ROLE from '../../../constants/role'
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import { isMode } from '../../../utils/check';
import USMAccountPassword from '../detail/password';
const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMUpdateAccount = ({CurrentUser, visibleUpdate, setVisibleUpdate, data, setData, idSelected, env}) => {
  const [usmImages, setUsmImages] = useState([])
  const [form] = Form.useForm();
  const dataSelected = data.filter(element => element?.id === idSelected)[0]
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser
  
  useEffect(() => {
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
      password: dataSelected?.password,
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
    if(isMode([MODE.NORMAL])) {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.STAFF_UPDATE + values.id, {
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
          setData(prev => prev.map(element => {
            if (element?.id === idSelected) {
              return values
            } else {
              return element
            }
          }))
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
      setData(prev => prev.map(element => {
        if (element?.id === idSelected) {
          return values
        } else {
          return element
        }
      }))
    }
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
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Chỉnh sửa thông tin chung" key="1">
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
                    <Select placeholder="Chọn trạng thái của tài khoản" 
                      onChange={value => {
                        if (isMode([MODE.NORMAL])) {
                          const url = value ? API.ACCOUNT_DISABLE : API.ACCOUNT_UNDISABLED
                          fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + url + dataSelected.id, {
                            method: value ? 'DELETE' : 'PUT',
                            headers: {
                              'accept': 'application/json',
                              'Authorization': currentUser.token
                            },
                          })
                          .then(response => {
                            return response.json()})
                          .then(dt => {
                            // eslint-disable-next-line
                            if(dt?.status_code != 200) {
                              openNotificationWithIcon(
                                'error',
                                'Cập nhật không thành công',
                                dt?.msg,
                              )
                            } else {
                              const newData = data.map(element => {
                                if (element.id === dataSelected.id) {
                                  element.is_disabled = value
                                }
                                return element
                              })
                              setData(newData)
                              message.success("Cập nhật thành công")
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
                          const newData = data.map(element => {
                            if (element.id === dataSelected.id) {
                              element.is_disabled = value
                            }
                            return element
                          })
                          setData(newData)
                          message.success("Cập nhật thành công")
                        }
                      }}
                    >
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
              <Button type="primary" htmlType="submit" id="usm-button-update">
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chỉnh sửa mật khẩu" key="2">
            <USMAccountPassword IDAccountUpdate={idSelected} currentUser={currentUser} env={env}/>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default USMUpdateAccount;