import { Descriptions, List, Table, DatePicker, Image, Space } from "antd"
import { moneyToText, splitMoney } from '../../../utils/money'
import moment from 'moment'
import * as ROLE from '../../../constants/role'
import { useEffect, useState } from "react";
import { getProducts } from "../../../utils/cart";
import { BILL_STATUS } from "../../../constants/status";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMBillDetail = ({Data, env}) => {
  // eslint-disable-next-line
  const [itemSelected, setItemSelected] = Data
  const [data, setData] = useState()

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
    setData({...itemSelected, productsDetail: vals})
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
              Mã đơn hàng: <strong>{data?.id}</strong>
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
            title={() => {
              if (data?.status === 'pay' || data?.status === 'debt' || data?.status === 'pay1') {
                return 'Danh sách sản phẩm đã mua'
              } else if (data?.status === 'refund') {
                return 'Danh sách sản phẩm đã hoàn trả'
              }
            }}
          />
        </Descriptions.Item>
        {(data?.status === 'pay' || data?.status === 'debt') &&
          <>
            <Descriptions.Item>
                <span>Tổng tiền: <strong>{splitMoney(data?.totalPrice)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{data?.textPrice}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tiền khách trả: <strong>{splitMoney(data?.customer?.pricePay)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{moneyToText(data?.customer?.pricePay)}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tiền trả khách: <strong>{splitMoney(parseFloat(data?.customer?.pricePay) - parseFloat(data?.totalPrice))}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{moneyToText(parseFloat(data?.customer?.pricePay) - parseFloat(data?.totalPrice))}</i></span>
            </Descriptions.Item>
          </>
        }
        {data?.status === 'refund' &&
          <>
            <Descriptions.Item>
                <span>Tổng tiền: <strong>{splitMoney(data?.totalPrice)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{data?.textPrice}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tiền trả khách: <strong>{splitMoney(parseFloat(data?.customer?.priceBack))}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{moneyToText(parseFloat(data?.customer?.priceBack))}</i></span>
            </Descriptions.Item>
          </>
        }
        {(data?.status === 'pay1') &&
          <>
            <Descriptions.Item>
                <span>Tổng tiền: <strong>{splitMoney(data?.totalPrice)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{data?.textPrice}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tiền khách trả: <strong>{splitMoney(data?.customer?.pricePay)}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{moneyToText(data?.customer?.pricePay)}</i></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Tiền trả khách: <strong>{splitMoney((data?.customer?.priceBack))}</strong></span>
            </Descriptions.Item>
            <Descriptions.Item>
                <span>Bằng chữ: <i>{moneyToText((data?.customer?.priceBack))}</i></span>
            </Descriptions.Item>
          </>
        }
        <Descriptions.Item span={2}>
            <span>Ảnh minh chứng: </span>
            <Space>
              {data?.images.map((element, id) => {
                return <Image key={id} src={element} width={200}/>
              })}
            </Space>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
            <span>Ghi chú: <i>{data?.note}</i></span>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default USMBillDetail