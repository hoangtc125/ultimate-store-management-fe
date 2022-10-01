import { Button, Col, Drawer, Form, Input, Row, Select, Space, Popconfirm, message, TimePicker } from 'antd';
import moment from 'moment'
import React, { useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import openNotificationWithIcon from '../../../utils/notification';
import { isMode } from '../../../utils/check';
const { Option } = Select;

const USMUpdateShift = ({CurrentUser, visibleUpdate, setVisibleUpdate, data, setData, idSelected, env}) => {
  const [form] = Form.useForm();
  const dataSelected = data.filter(element => element?.id === idSelected)[0]
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser
  
  useEffect(() => {
    form.setFieldsValue({
      name: dataSelected?.name,
      start: moment(dataSelected?.start, 'HH:mm:ss'),
      end: moment(dataSelected?.end, 'HH:mm:ss'),
      is_disabled: dataSelected?.is_disabled ? true : false,
    });
    // eslint-disable-next-line
  }, [idSelected])

  const onFinish = (values) => {
    values.id = idSelected
    values.key = idSelected
    values.start = values.start.format("HH:mm:ss")
    values.end = values.end.format("HH:mm:ss")
    if(isMode([MODE.NORMAL])) {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.PRODUCT_UPDATE + values.id, {
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
      'Ca làm việc đã được chỉnh sửa, hãy kiểm tra!'
    )
    document.getElementById("usm-button-update").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy chỉnh sửa',
      'Đã hủy chỉnh sửa thông tin Ca làm việc!'
    )
  };

  const onClose = () => {
    setVisibleUpdate(false);
  };

  return (
    <>
      <Drawer
        title="Chỉnh sửa Ca làm việc"
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
                label="Tên ca làm"
                rules={[
                  {
                    required: true,
                    message: 'Tên Ca làm việc không được bỏ trống',
                  },
                ]}
              >
                <Input placeholder="Nhập tên ca làm"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start"
                label="Bắt đầu"
                rules={[
                  {
                    required: true,
                    message: 'Không được bỏ trống',
                  },
                ]}
              >
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="end"
                label="Kết thúc"
                rules={[
                  {
                    required: true,
                    message: 'Không được bỏ trống',
                  },
                ]}
              >
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="is_disabled"
                label="Trạng thái của Ca làm việc"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Chọn trạng thái của Ca làm việc" 
                      onChange={value => {
                        if (isMode([MODE.NORMAL])) {
                          const url = value ? API.PRODUCT_DISABLE : API.PRODUCT_UNDISABLED
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
          <Button type="primary" htmlType="submit" id="usm-button-update">
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default USMUpdateShift;