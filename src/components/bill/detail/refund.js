import { Descriptions, List, Table, DatePicker, InputNumber, Button } from "antd"
import { SafetyCertificateOutlined } from "@ant-design/icons"
import { moneyToText, splitMoney } from '../../../utils/money'
import moment from 'moment'
import * as ROLE from '../../../constants/role'
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import { useEffect, useState } from "react";
import { getProducts } from "../../../utils/cart";
import { BILL_STATUS } from "../../../constants/status";
import Bill from "../../../model/bill";
import { isMode } from "../../../utils/check"
import openNotificationWithIcon from "../../../utils/notification"
import { BillRelation, BillRelationItem } from "../../../model/billRelation"
import USMUpload from "../../utils/upload"
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMBillRefund = ({CurrentUser, ItemSelected, env, BillData, setIsModalVisibleReFund, BillRelationData}) => {
  const [usmImages, setUsmImages] = useState([])
  // eslint-disable-next-line
  const [billRelationData, setBillRelationData] = BillRelationData
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  // eslint-disable-next-line
  const [billData, setBillData] = BillData
  // eslint-disable-next-line
  const [itemSelected, setItemSelected] = useState(() => {
    let productsRefund = {}
    const productKeys = Object.keys(ItemSelected.products)
    productKeys.map(element => {
      productsRefund[element] = 0
      return 1
    })
    let refundMax = {...ItemSelected.products}
    let debtPrice = ItemSelected?.customer?.priceBack < 0 ? ItemSelected?.customer?.priceBack : 0
    let pricePay = ItemSelected?.customer?.pricePay
    billRelationData.find(element => element.id === ItemSelected?.id)?.childs.map(bill => {
      const tempBillData = billData.find(e => e.id === bill.id)
      if (bill.status === 'refund') {
        productKeys.map(key => {
          refundMax[key] = refundMax[key] - tempBillData.products[key]
          return 1
        })
      }
      if (bill.status === 'pay1') {
        pricePay = pricePay + tempBillData?.customer?.pricePay
      }
      debtPrice = tempBillData?.customer?.priceBack < 0 ? tempBillData?.customer?.priceBack : 0
      return 1
    })
    const newBill = new Bill({
      id: billData.length + 1,
      created_at: new Date().toLocaleDateString('en-GB'),
      products: productsRefund,
      customer: {...ItemSelected?.customer, priceBack: debtPrice, pricePay: pricePay},
      store: ItemSelected?.store,
      seller: ItemSelected?.seller,
      status: "refund",
      note: "Mã hóa đơn gốc: " + ItemSelected?.id
    })
    return {...newBill, key: newBill.id, refundMax: refundMax}
  })
  const [data, setData] = useState()

  const handleIntoRelation = async () => {
    let newBillRelationItem = new BillRelationItem({
      id: data?.id,
      created_at: new Date().toLocaleDateString('en-GB'),
      status: data?.status 
    })
    const response = await fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.BILL_CREATE, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': currentUser.token
      },
      body: JSON.stringify({...data, images: usmImages}),
    })
    const res = await response.json()
    // eslint-disable-next-line
    if (res?.status_code == 200) {
      openNotificationWithIcon(
        'success',
        'Tạo hóa đơn thành công',
        ''
      )
      newBillRelationItem.id = res?.data?.id
      setBillData(prev => [...prev, {...data, images: usmImages, id: res?.data?.id, key: res?.data?.id}])
    } else {
      openNotificationWithIcon(
        'success',
        'Lỗi hệ thống',
        ''
      )
    }
    const response2 = await fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.INTO_RELATION + ItemSelected?.id, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': currentUser.token
      },
      body: JSON.stringify(newBillRelationItem),
    })
    const res2 = await response2.json()
    // eslint-disable-next-line
    if (res2?.status_code == 200) {
      openNotificationWithIcon(
        'success',
        'Tạo hóa đơn thành công',
        ''
      )
      const newBillRelationData = billRelationData.map(element => {
        if (element.id === ItemSelected?.id) {
          element.childs.push(newBillRelationItem)
        }
        return element
      })
      setBillRelationData(newBillRelationData)
    } else {
      openNotificationWithIcon(
        'success',
        'Lỗi hệ thống',
        ''
      )
    }
  }

  const getDetail = async () => {
    const newProducts = await getProducts(itemSelected, env)
    let vals = newProducts.map(product => {
      return {
        key: product?.id,
        itemQuantity: itemSelected.products[product?.id],
        itemSubPrice: itemSelected.products[product?.id] * product?.priceOut,
        ...product,
      }
    })
    const totalPrice = vals.reduce((total, element) => {
      return total + element.itemSubPrice
    }, 0)
    const textPrice = moneyToText(totalPrice)
    setData({...itemSelected, productsDetail: vals, totalPrice: totalPrice, textPrice: textPrice,
      customer: {...itemSelected?.customer, priceBack: itemSelected?.customer?.priceBack + totalPrice}
    })
  }

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line
  }, [itemSelected])

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
        return (
          <div>
            <InputNumber min={0} max={itemSelected.refundMax[record.id]} value={record.itemQuantity} onChange={(value) => {
              let newBill = {...itemSelected}
              newBill.products[record.id] = value
              setItemSelected(newBill)
            }} />
            <span> / {itemSelected.refundMax[record.id]}</span>
          </div>
        )
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'itemSubPrice',
      width: "10%",
      render: (_, record) => {
        return splitMoney(record?.itemSubPrice)
      }
    },
  ];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Descriptions column={2} bordered width={"100%"}>
        <Descriptions.Item>
          <List>
            <List.Item>
              Cửa hàng: {data?.store?.name} 
            </List.Item>
            <List.Item>
              Địa chỉ: {data?.store?.address}
            </List.Item>
            <List.Item>
              Liên hệ: {data?.store?.owner} - SĐT: {data?.store?.phone}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              Khách hàng: {data?.customer?.name} 
            </List.Item>
            <List.Item>
              Địa chỉ: {data?.customer?.address}
            </List.Item>
            <List.Item>
              SĐT: {data?.customer?.phone}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              Mã đơn hàng: 
            </List.Item>
            <List.Item>
              Trạng thái đơn hàng: <strong>{BILL_STATUS[data?.status]?.content}</strong>
            </List.Item>
            <List.Item>
              Ngày mua: <DatePicker format={dateFormatList} value={moment(data?.created_at, dateFormatList)} disabled/>
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              Người bán:  {data?.seller?.name} 
            </List.Item>
            <List.Item>
              Mã số : {data?.seller?.id}
            </List.Item>
            <List.Item>
              Chức vụ: {data?.seller?.role === ROLE.ADMIN ? "Chủ cửa hàng" : "Nhân viên bán hàng"}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
          <Table
            columns={columns}
            pagination={false}
            width={"100%"}
            dataSource={data?.productsDetail}
            bordered
            title={() => 'Danh sách sản phẩm cần hoàn trả'}
          />
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Tổng tiền: <strong>{splitMoney(data?.totalPrice)}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Bằng chữ: <i>{data?.textPrice}</i></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Tiền khách nợ: <strong>{splitMoney(itemSelected?.customer?.priceBack)}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Bằng chữ: <i>{moneyToText(itemSelected?.customer?.priceBack)}</i></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Tiền trả khách: <strong>{splitMoney(parseFloat(data?.customer?.priceBack))}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Bằng chữ: <i>{moneyToText(parseFloat(data?.customer?.priceBack))}</i></span>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
            <span>Ảnh minh chứng: </span>
            <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
            <span>Ghi chú: <i>{data?.note}</i></span>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
          <Button type='secondary' danger 
            icon={
              <SafetyCertificateOutlined 
                style={{fontSize: "1.5rem"}}
              />
            }
            onClick={async () => {
              // eslint-disable-next-line
              if (data?.totalPrice == 0) {
                openNotificationWithIcon(
                  'error',
                  'Chưa chọn sản phẩm hoàn trả',
                  ''
                )
                return
              }
              if (isMode([MODE.TEST])) {
                const newBillRelationItem = new BillRelationItem({
                  id: data?.id,
                  created_at: new Date().toLocaleDateString('en-GB'),
                  status: data?.status 
                })
                if (billRelationData.find(element => element?.id === ItemSelected?.id)) {
                  const newBillRelationData = billRelationData.map(element => {
                    if (element.id === ItemSelected?.id) {
                      element.childs.push(newBillRelationItem)
                    }
                    return element
                  })
                  setBillRelationData(newBillRelationData)
                } else {
                  const newBillRelation = new BillRelation({id: ItemSelected?.id, childs: [newBillRelationItem]})
                  setBillRelationData(pre => [...pre, newBillRelation])
                }
                setBillData(prev => [...prev, {...data, images: usmImages}])
                openNotificationWithIcon(
                  'success',
                  'Hoàn trả sản phẩm cho khách thành công',
                  ''
                )
              } else {
                await handleIntoRelation()
              }
              setIsModalVisibleReFund(false)
            }}
          > 
            Hoàn trả
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default USMBillRefund