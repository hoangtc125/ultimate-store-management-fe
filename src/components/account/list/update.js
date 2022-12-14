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
            'C???p nh???t kh??ng th??nh c??ng',
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
          'C???p nh???t kh??ng th??nh c??ng',
          'Th??ng tin kh??ng ???????c c???p nh???t!'
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
      'Ch???nh s???a th??nh c??ng',
      'H??y ki???m tra l???i th??ng tin v???a ch???nh s???a!'
    )
    document.getElementById("usm-button-update").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'H???y ch???nh s???a',
      '???? h???y ch???nh s???a th??ng tin nh??n vi??n!'
    )
  };

  const onClose = () => {
    setVisibleUpdate(false);
  };

  return (
    <>
      <Drawer
        title="Ch???nh s???a t??i kho???n"
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
            <Button onClick={onClose}>H???y</Button>
            <Popconfirm
              title="?????ng ?? l??u thay ?????i?"
              onConfirm={confirm}
              onCancel={cancel}
              placement="bottom"
              okText="X??c nh???n"
              cancelText="H???y"
            >
              <Button type="primary" htmlType="submit" form='usm-form-update'>
                Ho??n t???t
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Ch???nh s???a th??ng tin chung" key="1">
            <Form layout="vertical" hideRequiredMark
              onFinish={onFinish}
              id="usm-form-update"
              form={form}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullname"
                    label="H??? t??n"
                    rules={[
                      {
                        required: true,
                        message: 'H??? t??n kh??ng ???????c b??? tr???ng',
                      },
                    ]}
                  >
                    <Input placeholder="Nh???p h??? t??n"/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="avatar"
                    label="???nh ?????i di???n (???nh ?????u ti??n s??? ???????c ch???n)"
                  >
                    <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Ch???c v???"
                    rules={[
                      {
                        required: true,
                        message: 'Ch???c v??? kh??ng ???????c ????? tr???ng ',
                      },
                    ]}
                  >
                    <Select placeholder="Ch???n ch???c v???" >
                      <Option value={ROLE.STAFF}>Nh??n vi??n b??n h??ng</Option>
                      <Option value={ROLE.ADMIN}>Ch??? c???a h??ng</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="ratio_salary"
                    label="H??? s??? l????ng"
                    rules={[
                      {
                        required: true,
                        message: 'H??? s??? l????ng kh??ng ???????c b??? tr???ng',
                      },
                    ]}
                  >
                    <Input placeholder="Nh???p h??? s??? l????ng" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="T??n ????ng nh???p"
                    rules={[
                      {
                        required: true,
                        message: 'T??n ????ng nh???p kh??ng ???????c ????? tr???ng',
                      },
                    ]}
                  >
                    <Input placeholder="Nh???p t??n ????ng nh???p" disabled/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="S??? ??i???n tho???i"
                    rules={[
                      {
                        required: true,
                        message: 'S??? ??i???n tho???i kh??ng ???????c ????? tr???ng',
                      },
                    ]}
                  >
                    <Input placeholder="Nh???p s??? ??i???n tho???i" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="?????a ch??? Email"
                    rules={[
                      {
                        required: true,
                        message: '?????a ch??? Email kh??ng ???????c ????? tr???ng',
                      },
                    ]}
                  >
                    <Input placeholder="Nh???p ?????a ch??? Email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="birthday"
                    label="Ng??y sinh"
                    rules={[
                      {
                        required: true,
                        message: 'Ng??y sinh kh??ng ???????c ????? tr???ng',
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
                    label="Tr???ng th??i c???a t??i kho???n"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="Ch???n tr???ng th??i c???a t??i kho???n" 
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
                                'C???p nh???t kh??ng th??nh c??ng',
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
                              message.success("C???p nh???t th??nh c??ng")
                            }
                          })
                          .catch((error) => {
                            openNotificationWithIcon(
                              'error',
                              'C???p nh???t kh??ng th??nh c??ng',
                              'Th??ng tin kh??ng ???????c c???p nh???t!'
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
                          message.success("C???p nh???t th??nh c??ng")
                        }
                      }}
                    >
                      <Option value={false}>B??nh th?????ng</Option>
                      <Option value={true}>V?? hi???u h??a</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="profile"
                    label="Th??ng tin kh??c"
                  >
                    <Input.TextArea rows={4} placeholder="Nh???p th??ng tin kh??c" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" id="usm-button-update">
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Ch???nh s???a m???t kh???u" key="2">
            <USMAccountPassword IDAccountUpdate={idSelected} currentUser={currentUser} env={env}/>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default USMUpdateAccount;