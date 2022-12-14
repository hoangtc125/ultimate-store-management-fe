import { Descriptions, List, Table, DatePicker, Drawer, Space, Button, Popconfirm, Form, Input, InputNumber, Select } from "antd"
import { moneyToText, splitMoney } from '../../../utils/money'
import moment from 'moment'
import openNotificationWithIcon from "../../../utils/notification";
import { useEffect, useState } from "react";
import Customer from "../../../model/customer";
import Cart from "../../../model/cart";
import * as ROLE from '../../../constants/role'
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import { isMode } from "../../../utils/check";
import USMUpload from "../../utils/upload";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMCheckout = ({ BillData, Data, Visible, CartData, CurrentUser, StoreData, env }) => {
  const [usmImages, setUsmImages] = useState([])
  // eslint-disable-next-line
  const [itemSelected, setItemSelected] = Data
  // eslint-disable-next-line
  const [billData, setBillData] = BillData
  // eslint-disable-next-line
  const [cartData, setCartData] = CartData
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const [visible, setVisible] = Visible
  const [customerTextPricePay, setCustomerTextPricePay] = useState(moneyToText(itemSelected?.customer?.pricePay))
  const [customerTextPriceBack, setCustomerTextPriceBack] = useState(moneyToText(itemSelected?.customer?.pricePay - itemSelected?.totalPrice))
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      customer_name: itemSelected?.customer?.name,
      customer_phone: itemSelected?.customer?.phone,
      customer_address: itemSelected?.customer?.address,
      customer_pricePay: itemSelected?.customer?.pricePay,
      customer_priceBack: itemSelected?.customer?.pricePay - itemSelected?.totalPrice,
      status: itemSelected?.customer?.pricePay - itemSelected?.totalPrice > 0 ? "pay" : "debt",
    });
    setCustomerTextPricePay(moneyToText(itemSelected?.customer?.pricePay))
    setCustomerTextPriceBack(moneyToText(itemSelected?.customer?.pricePay - itemSelected?.totalPrice))
    // eslint-disable-next-line
  }, [itemSelected])

  const onFinish = (values) => {
    const newBill ={
      key: itemSelected.id,
      ...itemSelected,
      status: values.status,
      customer: new Customer({
        name: values.customer_name,
        phone: values.customer_phone,
        address: values.customer_address,
        pricePay: values.customer_pricePay,
        priceBack: values.customer_priceBack,
      }),
      note: values.note,
      seller: {
        id: currentUser?.id,
        name: currentUser?.fullname,
        role: currentUser?.role,
      },
      images: usmImages,
    }
    if (isMode([MODE.TEST])) {
      setBillData(prev => [...prev, newBill])
      setCartData(new Cart({
        products: {},
      }))
    } else {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.BILL_CREATE, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': currentUser.token
        },
        body: JSON.stringify(newBill),
      })
      .then(response => {
        return response.json()})
      .then(data => {
        // eslint-disable-next-line
        if(data?.status_code != 200) {
          openNotificationWithIcon(
            'error',
            'Thanh to??n kh??ng th??nh c??ng',
            data?.msg,
          )
        } else {
          setCartData(new Cart({
            products: {},
          }))
          openNotificationWithIcon(
            'success',
            'Thanh to??n th??nh c??ng',
            'H??a ????n m???i ???? ???????c t???o!',
          )
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Thanh to??n kh??ng th??nh c??ng',
          'Th??ng tin kh??ng ???????c c???p nh???t!'
        )
      });
    }
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Thanh to??n th??nh c??ng',
      'H??a ????n m???i ???? ???????c t???o!'
    )
    document.getElementById("usm-button-checkout").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      '???? h???y thanh to??n',
      '???? h???y t???o h??a ????n m???i!'
    )
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'M?? s???',
      dataIndex: 'id',
      width: "8%",
      render: (_, record) => {
        return record?.id
      }
    },
    {
      title: 'S???n ph???m',
      dataIndex: 'name',
      width: "15%",
      render: (_, record) => {
        return record?.name
      }
    },
    {
      title: 'Gi?? b??n',
      dataIndex: 'priceOut',
      width: "10%",
      render: (_, record) => {
        return splitMoney(record?.priceOut)
      }
    },
    {
      title: 'S??? l?????ng',
      dataIndex: 'itemQuantity',
      width: "10%",
      render: (_, record) => {
        return record?.itemQuantity
      }
    },
    {
      title: 'Th??nh ti???n',
      dataIndex: 'itemSubPrice',
      width: "10%",
      render: (_, record) => {
        return splitMoney(record?.itemSubPrice  )
      }
    },
  ];

  return (
    <Drawer
        title="Thanh to??n"
        width={"70%"}
        onClose={onClose}
        visible={visible}
        placement="left"
        destroyOnClose={false}
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
              <Button type="primary" htmlType="submit" form='usm-form-create'>
                Ho??n t???t
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark
          onFinish={onFinish}
          id="usm-form-checkout"
          form={form}
          style={{
            width: "100%",
          }}
        >
          <Descriptions column={2} bordered width={"100%"}>
            <Descriptions.Item>
              <List>
                <List.Item>
                  C???a h??ng: {itemSelected?.store?.name}
                </List.Item>
                <List.Item>
                  ?????a ch???: {itemSelected?.store?.address}
                </List.Item>
                <List.Item>
                  Li??n h???: {itemSelected?.store?.owner} - S??T: {itemSelected?.store?.phone}
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  Kh??ch h??ng: 
                  <Form.Item
                    name="customer_name"
                  >
                    <Input placeholder="Nh???p h??? t??n"/>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  ?????a ch???: 
                  <Form.Item
                    name="customer_address"
                  >
                    <Input placeholder="Nh???p ?????a ch???"/>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  S??T: 
                  <Form.Item
                    name="customer_phone"
                  >
                    <Input placeholder="Nh???p s??? ??i???n tho???i"/>
                  </Form.Item>
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  M?? ????n h??ng: <strong>{itemSelected?.id}</strong>
                </List.Item>
                <List.Item>
                  Tr???ng th??i ????n h??ng: 
                  <Form.Item
                    name="status"
                  >
                    <Select disabled>
                      <Select.Option value="pay">???? thanh to??n</Select.Option>
                      <Select.Option value="debt">N???</Select.Option>
                    </Select>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  Ng??y mua: <DatePicker format={dateFormatList} value={moment(itemSelected?.created_at, dateFormatList)} disabled/>
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  Ng?????i b??n:  {currentUser?.fullname} 
                </List.Item>
                <List.Item>
                  M?? s??? : {currentUser?.id}
                </List.Item>
                <List.Item>
                  Ch???c v???: {currentUser?.role === ROLE.ADMIN ? "Ch??? c???a h??ng" : "Nh??n vi??n b??n h??ng"}
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <Table
                columns={columns}
                pagination={false}
                width={"100%"}
                dataSource={itemSelected?.productsDetail}
                bordered
                title={() => 'Danh s??ch s???n ph???m ???? mua'}
              />
            </Descriptions.Item>
            <Descriptions.Item>
                <span>T???ng ti???n: <strong>{splitMoney(itemSelected?.totalPrice)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>B???ng ch???: <i>{itemSelected?.textPrice}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>
                  Ti???n kh??ch tr???: 
                  <Form.Item
                    name="customer_pricePay"
                  >
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}    
                      onChange={(value) => {
                        setCustomerTextPricePay(moneyToText(value))
                        setCustomerTextPriceBack(moneyToText(value - parseFloat(itemSelected?.totalPrice)))
                        form.setFieldsValue({
                          customer_priceBack: value - itemSelected?.totalPrice,
                          status: value - itemSelected?.totalPrice > 0 ? "pay" : "debt",
                        })
                      }}
                      style={{
                        width: "100%",
                      }}            
                    />
                  </Form.Item>
                </span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>
                  B???ng ch???: <i>{customerTextPricePay}</i>
                </span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>
                  Ti???n tr??? kh??ch: 
                  <Form.Item
                    name="customer_priceBack"
                  >
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}    
                      onChange={(value) => {
                        
                      }}
                      style={{
                        width: "100%",
                      }}       
                      disabled     
                    />
                  </Form.Item>
                </span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>B???ng ch???: <i>{customerTextPriceBack}</i></span>
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <span>
                ???nh minh ch???ng:
                <Form.Item
                  name="images"
                  label="Danh s??ch ???nh (C?? th??? ch???n nhi???u ???nh kh??c nhau)"
                >
                  <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
                </Form.Item>
              </span>
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <span>
                Ghi ch??:
                <Form.Item
                  name="note"
                >
                  <Input.TextArea rows={4} placeholder="Nh???p ghi ch??" />
                </Form.Item>
              </span>
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" htmlType="submit" id="usm-button-checkout">
          </Button>
        </Form>
      </Drawer>
  )
}

export default USMCheckout