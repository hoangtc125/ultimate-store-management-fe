import { Button, Col, Drawer, Form, Input, Row, Select, Space, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import USMTag from '../../utils/tag';
import USMUpload from '../../utils/upload';
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import openNotificationWithIcon from '../../../utils/notification';
import { isMode } from '../../../utils/check';
const { Option } = Select;

const USMUpdateProduct = ({CurrentUser, visibleUpdate, setVisibleUpdate, data, setData, idSelected, env}) => {
  const [usmImages, setUsmImages] = useState([])
  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();
  const dataSelected = data.filter(element => element?.id === idSelected)[0]
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser
  
  useEffect(() => {
    form.setFieldsValue({
      name: dataSelected?.name,
      nickname: dataSelected?.nickname,
      priceIn: dataSelected?.priceIn,
      brand: dataSelected?.brand,
      quantity: dataSelected?.quantity,
      priceOut: dataSelected?.priceOut,
      images: dataSelected?.images,
      is_disabled: dataSelected?.is_disabled,
    });
    setUsmImages(dataSelected?.images)
    setTags(dataSelected?.nickname || [])
    // eslint-disable-next-line
  }, [idSelected])

  const onFinish = (values) => {
    if  (usmImages.length === 0) {
      values.images = [images.default]
    } else {
      values.images = usmImages
    }
    values.nickname = tags
    values.id = idSelected
    values.key = idSelected
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
      'S???n ph???m ???? ???????c ch???nh s???a, h??y ki???m tra!'
    )
    document.getElementById("usm-button-update").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'H???y ch???nh s???a',
      '???? h???y ch???nh s???a th??ng tin s???n ph???m!'
    )
  };

  const onClose = () => {
    setVisibleUpdate(false);
  };

  return (
    <>
      <Drawer
        title="Ch???nh s???a s???n ph???m"
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
        <Form layout="vertical" hideRequiredMark
          onFinish={onFinish}
          id="usm-form-update"
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="T??n s???n ph???m"
                rules={[
                  {
                    required: true,
                    message: 'T??n s???n ph???m kh??ng ???????c b??? tr???ng',
                  },
                ]}
              >
                <Input placeholder="Nh???p t??n s???n ph???m"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="images"
                label="Danh s??ch ???nh (C?? th??? ch???n nhi???u ???nh kh??c nhau)"
              >
                <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Th????ng hi???u"
              >
                <Input placeholder="Nh???p th????ng hi???u"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="S??? l?????ng"
                rules={[
                  {
                    required: true,
                    message: 'S??? l?????ng kh??ng ???????c b??? tr???ng',
                  },
                ]}
              >
                <Input placeholder="Nh???p s??? l?????ng" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priceIn"
                label="Gi?? nh???p v??o"
                rules={[
                  {
                    required: true,
                    message: 'Gi?? nh???p v??o kh??ng ???????c ????? tr???ng',
                  },
                ]}
              >
                <Input placeholder="Nh???p gi?? nh???p v??o" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priceOut"
                label="Gi?? b??n ra"
                rules={[
                  {
                    required: true,
                    message: 'Gi?? b??n ra kh??ng ???????c ????? tr???ng',
                  },
                ]}
              >
                <Input placeholder="Nh???p gi?? b??n ra" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nickname"
                label="T??n g???i kh??c"
              >
                <USMTag Tags={[tags, setTags]}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_disabled"
                label="Tr???ng th??i c???a s???n ph???m"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Ch???n tr???ng th??i c???a s???n ph???m" 
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
          <Button type="primary" htmlType="submit" id="usm-button-update">
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default USMUpdateProduct;