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
            'C???p nh???t kh??ng th??nh c??ng',
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
          'C???p nh???t kh??ng th??nh c??ng',
          'Th??ng tin kh??ng ???????c c???p nh???t!'
        )
      });
    } else {
      setCurrentUser(values)
    }
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Ch???nh s???a th??nh c??ng',
      'H??y ki???m tra l???i th??ng tin v???a ch???nh s???a!'
    )
    document.getElementById("usm-button-detail").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'H???y ch???nh s???a',
      '???? h???y ch???nh s???a th??ng tin!'
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
          <Col span={8}>
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
              <Select placeholder="Ch???n ch???c v???" disabled>
                <Option value={ROLE.STAFF}>Nh??n vi??n b??n h??ng</Option>
                <Option value={ROLE.ADMIN}>Ch??? c???a h??ng</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <Input placeholder="Nh???p h??? s??? l????ng" disabled/>
            </Form.Item>
          </Col>
          <Col span={8}>
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
              <Select placeholder="Ch???n tr???ng th??i c???a t??i kho???n" disabled>
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
        <Popconfirm
          title="?????ng ?? l??u thay ?????i?"
          onConfirm={confirm}
          onCancel={cancel}
          placement="bottom"
          okText="X??c nh???n"
          cancelText="H???y"
        >
          <Button type="primary">
            L??u thay ?????i
          </Button>
        </Popconfirm>
        <Button type="primary" htmlType="submit" id="usm-button-detail">
        </Button>
      </Form>
    </>
  );
};

export default USMAccountGeneral;