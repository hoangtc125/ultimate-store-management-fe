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
      note: "M?? h??a ????n g???c: " + ItemSelected?.id
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
        'T???o h??a ????n th??nh c??ng',
        ''
      )
      newBillRelationItem.id = res?.data?.id
      setBillData(prev => [...prev, {...data, images: usmImages, id: res?.data?.id, key: res?.data?.id}])
    } else {
      openNotificationWithIcon(
        'success',
        'L???i h??? th???ng',
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
        'T???o h??a ????n th??nh c??ng',
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
        'L???i h??? th???ng',
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
      title: 'Th??nh ti???n',
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
              C???a h??ng: {data?.store?.name} 
            </List.Item>
            <List.Item>
              ?????a ch???: {data?.store?.address}
            </List.Item>
            <List.Item>
              Li??n h???: {data?.store?.owner} - S??T: {data?.store?.phone}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              Kh??ch h??ng: {data?.customer?.name} 
            </List.Item>
            <List.Item>
              ?????a ch???: {data?.customer?.address}
            </List.Item>
            <List.Item>
              S??T: {data?.customer?.phone}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              M?? ????n h??ng: 
            </List.Item>
            <List.Item>
              Tr???ng th??i ????n h??ng: <strong>{BILL_STATUS[data?.status]?.content}</strong>
            </List.Item>
            <List.Item>
              Ng??y mua: <DatePicker format={dateFormatList} value={moment(data?.created_at, dateFormatList)} disabled/>
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item>
          <List>
            <List.Item>
              Ng?????i b??n:  {data?.seller?.name} 
            </List.Item>
            <List.Item>
              M?? s??? : {data?.seller?.id}
            </List.Item>
            <List.Item>
              Ch???c v???: {data?.seller?.role === ROLE.ADMIN ? "Ch??? c???a h??ng" : "Nh??n vi??n b??n h??ng"}
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
            title={() => 'Danh s??ch s???n ph???m c???n ho??n tr???'}
          />
        </Descriptions.Item>
        <Descriptions.Item>
            <span>T???ng ti???n: <strong>{splitMoney(data?.totalPrice)}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>B???ng ch???: <i>{data?.textPrice}</i></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Ti???n kh??ch n???: <strong>{splitMoney(itemSelected?.customer?.priceBack)}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>B???ng ch???: <i>{moneyToText(itemSelected?.customer?.priceBack)}</i></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Ti???n tr??? kh??ch: <strong>{splitMoney(parseFloat(data?.customer?.priceBack))}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>B???ng ch???: <i>{moneyToText(parseFloat(data?.customer?.priceBack))}</i></span>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
            <span>???nh minh ch???ng: </span>
            <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
            <span>Ghi ch??: <i>{data?.note}</i></span>
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
                  'Ch??a ch???n s???n ph???m ho??n tr???',
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
                  'Ho??n tr??? s???n ph???m cho kh??ch th??nh c??ng',
                  ''
                )
              } else {
                await handleIntoRelation()
              }
              setIsModalVisibleReFund(false)
            }}
          > 
            Ho??n tr???
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default USMBillRefund