import { Descriptions, List, Table, DatePicker, Drawer, Space, Button, Popconfirm, Form, Input, InputNumber, Select } from "antd"
import { moneyToText, splitMoney } from '../../../utils/money'
import moment from 'moment'
import openNotificationWithIcon from "../../../utils/notification";
import { useEffect, useState } from "react";
import Customer from "../../../model/customer";
import Cart from "../../../model/cart";
import * as ROLE from '../../../constants/role'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMCheckout = ({ BillData, Data, Visible, CartData, CurrentUser }) => {
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
      status: values.status === "pay" ? "Đã thanh toán" : "Nợ",
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
    }
    setBillData(prev => [...prev, newBill])
    setCartData(new Cart({
      products: {},
    }))
    onClose()
  }

  const confirm = (e) => {
    openNotificationWithIcon(
      'success',
      'Thanh toán thành công',
      'Hóa đơn mới đã được tạo!'
    )
    document.getElementById("usm-button-checkout").click()
  };
  
  const cancel = (e) => {
    openNotificationWithIcon(
      'warning',
      'Đã hủy thanh toán',
      'Đã hủy tạo hóa đơn mới!'
    )
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      width: "8%",
      render: (_, record) => {
        return record?.id
      }
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      width: "15%",
      render: (_, record) => {
        return record?.name
      }
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceOut',
      width: "10%",
      render: (_, record) => {
        return splitMoney(record?.priceOut)
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'itemQuantity',
      width: "10%",
      render: (_, record) => {
        return record?.itemQuantity
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'itemSubPrice',
      width: "10%",
      render: (_, record) => {
        return splitMoney(record?.itemSubPrice  )
      }
    },
  ];

  return (
    <Drawer
        title="Thanh toán"
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
                  Cửa hàng: {itemSelected?.store?.name}
                </List.Item>
                <List.Item>
                  Địa chỉ: {itemSelected?.store?.address}
                </List.Item>
                <List.Item>
                  Liên hệ: {itemSelected?.store?.owner} - SĐT: {itemSelected?.store?.phone}
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  Khách hàng: 
                  <Form.Item
                    name="customer_name"
                  >
                    <Input placeholder="Nhập họ tên"/>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  Địa chỉ: 
                  <Form.Item
                    name="customer_address"
                  >
                    <Input placeholder="Nhập địa chỉ"/>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  SĐT: 
                  <Form.Item
                    name="customer_phone"
                  >
                    <Input placeholder="Nhập số điện thoại"/>
                  </Form.Item>
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  Mã đơn hàng: <strong>{itemSelected?.id}</strong>
                </List.Item>
                <List.Item>
                  Trạng thái đơn hàng: 
                  <Form.Item
                    name="status"
                  >
                    <Select disabled>
                      <Select.Option value="pay">Đã thanh toán</Select.Option>
                      <Select.Option value="debt">Nợ</Select.Option>
                    </Select>
                  </Form.Item>
                </List.Item>
                <List.Item>
                  Ngày mua: <DatePicker format={dateFormatList} value={moment(itemSelected?.created_at, dateFormatList)} disabled/>
                </List.Item>
              </List>
            </Descriptions.Item>
            <Descriptions.Item>
              <List>
                <List.Item>
                  Người bán:  {currentUser?.fullname} 
                </List.Item>
                <List.Item>
                  Mã số : {currentUser?.id}
                </List.Item>
                <List.Item>
                  Chức vụ: {currentUser?.role === ROLE.ADMIN ? "Chủ cửa hàng" : "Nhân viên bán hàng"}
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
                title={() => 'Danh sách sản phẩm đã mua'}
              />
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tổng tiền: <strong>{splitMoney(itemSelected?.totalPrice)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{itemSelected?.textPrice}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>
                  Tiền khách trả: 
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
                  Bằng chữ: <i>{customerTextPricePay}</i>
                </span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>
                  Tiền trả khách: 
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
                <span>Bằng chữ: <i>{customerTextPriceBack}</i></span>
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <span>
                Ghi chú:
                <Form.Item
                  name="note"
                >
                  <Input.TextArea rows={4} placeholder="Nhập ghi chú" />
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