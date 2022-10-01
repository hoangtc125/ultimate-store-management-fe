import { Button, Col, Drawer, Form, Input, Row, Select, Space, Popconfirm, TimePicker } from 'antd';
import React from 'react';
import openNotificationWithIcon from '../../../utils/notification';
import moment from 'moment';
import * as API from '../../../constants/api'
import * as MODE from '../../../constants/mode'
import { isMode } from '../../../utils/check';
import { ProductResponse } from '../../../model/product';
const { Option } = Select;

const USMCreateShift = ({CurrentUser, visibleCreate, setVisibleCreate, data, setData, env}) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

  const onFinish = (values) => {
    if (isMode([MODE.NORMAL])) {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.PRODUCT_CREATE, {
        method: 'POST',
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
          const newProductResponse = new ProductResponse({
            key: data?.data?.id,
            id: data?.data?.id,
            ...data?.data,
          })
          setData(prev => [...prev, newProductResponse])
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
      if (data.length > 0) {
        values.id = data[data.length - 1].id + 1
        values.key = data[data.length - 1].id + 1
      } else {
        values.id = 0
        values.key = 0
      }
      setData(prev => [...prev, {
        ...values,
        start: values.start.format("HH:mm:ss"),
        end: values.end.format("HH:mm:ss"),
        is_disabled: values?.is_disabled ? true : false
      }])
    }
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Thêm thành công',
      'Ca làm việc được thêm vào cuối danh sách!'
    )
    document.getElementById("usm-button-create").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Hủy thêm ca làm',
      'Đã hủy thêm mới ca làm!'
    )
  };

  const onClose = () => {
    setVisibleCreate(false);
  };

  return (
    <>
      <Drawer
        title="Thêm ca làm việc mới"
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
                label="Trạng thái của ca làm"
              >
                <Select placeholder="Chọn trạng thái của ca làm" defaultValue={false} disabled>
                  <Option value={false}>Bình thường</Option>
                  <Option value={true}>Vô hiệu hóa</Option>
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

export default USMCreateShift;