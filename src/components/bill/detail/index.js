import { Descriptions, List, Table, DatePicker } from "antd"
import { moneyToText, splitMoney } from '../../../utils/money'
import moment from 'moment'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMBillDetail = ({Data}) => {
  // eslint-disable-next-line
  const [itemSelected, setItemSelected] = Data


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
              Khách hàng: {itemSelected?.customer?.name} 
            </List.Item>
            <List.Item>
              Địa chỉ: {itemSelected?.customer?.address}
            </List.Item>
            <List.Item>
              SĐT: {itemSelected?.customer?.phone}
            </List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item span={2}>
          Mã đơn hàng: <strong>{itemSelected?.id}</strong>
        </Descriptions.Item>
        <Descriptions.Item>
          Trạng thái đơn hàng: <strong>{itemSelected?.status}</strong>
        </Descriptions.Item>
        <Descriptions.Item>
          Ngày mua: <DatePicker format={dateFormatList} value={moment(itemSelected?.created_at, dateFormatList)} disabled/>
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
            <span>Tiền khách trả: <strong>{splitMoney(itemSelected?.customer?.pricePay)}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Bằng chữ: <i>{moneyToText(itemSelected?.customer?.pricePay)}</i></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Tiền trả khách: <strong>{splitMoney(parseFloat(itemSelected?.customer?.pricePay) - parseFloat(itemSelected?.totalPrice))}</strong></span>
        </Descriptions.Item>
        <Descriptions.Item>
            <span>Bằng chữ: <i>{moneyToText(parseFloat(itemSelected?.customer?.pricePay) - parseFloat(itemSelected?.totalPrice))}</i></span>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default USMBillDetail