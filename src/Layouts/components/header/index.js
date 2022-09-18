import { Statistic, Descriptions, PageHeader, Tag, Image, InputNumber, DatePicker, Space, Button } from 'antd';
import {
  ShoppingCartOutlined,
  TrademarkOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images'
import { getProducts } from '../../../utils/cart';
import { moneyToText, splitMoney,  } from '../../../utils/money';
import { Link } from 'react-router-dom';
import * as URL from '../../../constants/url'
import moment from 'moment'
import USMCheckout from '../../../components/cart/checkout';
import openNotificationWithIcon from '../../../utils/notification';
import Customer from '../../../model/customer';
import Bill from '../../../model/bill';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const Header = ({CartData, BillData, CurrentUser, StoreData, env}) => {
  const [data, setData] = useState([])
  const [cartData, setCartData] = CartData
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const [totalPrice, setTotalPrice] = useState(0)
  // eslint-disable-next-line 
  const [billData, setBillData] = BillData
  // eslint-disable-next-line 
  const [storeData, setStoreData] = StoreData
  const [bill, setBill] = useState()
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const updateData = async (c) => {
    const newProducts = await getProducts(c, env)
    let vals = newProducts.map(product => {
      return {
        key: product?.id,
        itemQuantity: c.products[product?.id],
        itemSubPrice: c.products[product?.id] * product?.priceOut,
        ...product,
      }
    })
    setData(vals)
    setTotalPrice(
      vals.reduce((total, product) => {
        return total + product?.itemSubPrice
      }, 0)
    )
  }

  useEffect(() => {
    updateData(cartData)
    // eslint-disable-next-line
  }, [cartData])

  const renderContent = () => (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={URL.CART}><Tag color="error" icon={<ShoppingCartOutlined style={{fontSize: "2rem"}}/>}><strong>Giỏ hàng hiện tại ({Object.keys(cartData?.products || []).length})</strong></Tag></Link>
        <Space>
          <Button type='secondary' danger 
            icon={
              <SafetyCertificateOutlined 
                style={{fontSize: "1.5rem"}}
              />
            }
            onClick={() => {

            }}
          > 
            Hoàn trả
          </Button>
          <Button type='secondary' danger 
            icon={
              <SafetyCertificateOutlined 
                style={{fontSize: "1.5rem"}}
              />
            }
            onClick={() => {

            }}
          > 
            Trả nợ
          </Button>
          <Button type='primary' danger 
            icon={
              <SafetyCertificateOutlined 
                style={{fontSize: "1.5rem"}}
              />
            }
            onClick={() => {
              const newBill = new Bill({
                id: billData.length + 1,
                products: cartData.products,
                productsDetail: data,
                totalPrice: totalPrice,
                textPrice: moneyToText(totalPrice),
                store: storeData,
                customer: new Customer({}),
                created_at: new Date().toLocaleDateString('en-GB'),
              })
              setBill(newBill)
              if(data.length === 0) {
                openNotificationWithIcon(
                  'error',
                  'Không thể thanh toán',
                  'Không có sản phẩm nào trong giỏ hàng!'
                )
              } else {
                showDrawer()
              }
            }}
          > 
            Thanh toán
          </Button>
        </Space>
      </div>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "10px 0px",
        }}
      >
        {data.map(product => {
          return (
            <Tag
              key={product.id} 
              checked
              style={{
                width: "fit-content",
                padding: "2px 10px",
                fontSize: "1rem",
                background: "#fff"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>Tên: {product.name}</span>
                <span>Số lượng: {
                  <InputNumber min={0} max={product.quantity} value={product.itemQuantity} 
                    bordered={true}
                    onChange={(value) => {
                      let newCart = {...cartData}
                      if (!value) {
                        delete newCart.products[product.id]
                      } else {
                        newCart.products[product.id] = value
                      }
                      setCartData(newCart)
                      updateData(newCart)
                    }} 
                    style={{
                      width: "70px",
                    }}
                  />  
                }</span>
                <span>Giá: {splitMoney(product.itemSubPrice)}</span>
              </div>
            </Tag>
          )
        })}
      </div>
    </div>
  );
  
  const extraContent = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: "100%",
        }}
      >
        <Statistic title="Thành tiền" value={splitMoney(totalPrice)} 
          style={{
            marginRight: 32,
          }}
        />
        <Statistic title="Bằng chữ"
          formatter={() => {
            return moneyToText(totalPrice)
          }}
          style={{
            marginRight: 32,
          }}
        />
      </div>
    )
  }
  
  const Content = ({ children, extra }) => (
    <div className="content"
      style={{
        width: "55%",
        marginTop: "-60px",
      }}
    >
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  return (
    <div className="site-page-header-ghost-wrapper"
      style={{
        margin: "0px 15px",
      }}
    >
      <PageHeader
        ghost={false}
        title={<Tag color="blue"><strong>{window.localStorage.getItem("USM_MODE")}</strong> - <strong>{window.localStorage.getItem("USM_ROLE")}</strong></Tag>}
        subTitle={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "start",
            }}
          >
            <div>Phần mềm chuyển đổi số cho cửa hàng</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <span>kinh doanh quy mô hộ gia đình</span>  
              <TrademarkOutlined
                style={{
                  margin: "-10px 0 0 5px"
                }}
              />
            </div>
          </div>
        }
        style={{
          borderRadius: "10px",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "-10px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "45%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image src={currentUser?.avatar} fallback={images.default} width={80}/>
            <Descriptions size="small" column={2}
              style={{
                width: "80%",
                marginLeft: "10px",
              }}
            >
              <Descriptions.Item label="Nhân viên ">{currentUser?.fullname}</Descriptions.Item>
              <Descriptions.Item label="Mã nhân viên">
                <p>{currentUser?.id}</p>
              </Descriptions.Item>
              <Descriptions.Item label="Bắt đầu ca làm">{<DatePicker format={dateFormatList} value={moment(currentUser?.birthday, dateFormatList)} disabled />}</Descriptions.Item>
              <Descriptions.Item label="Kết thúc ca làm">{<DatePicker format={dateFormatList} value={moment(currentUser?.birthday, dateFormatList)} disabled />}</Descriptions.Item>
            </Descriptions>
          </div>
          <Content extra={extraContent()}>
            {renderContent()}
          </Content>
        </div>
      </PageHeader>
      <USMCheckout 
        BillData={BillData} 
        Data={[bill, setBill]} 
        Visible={[visible, setVisible]} 
        CartData={CartData} 
        CurrentUser={CurrentUser}
        StoreData={StoreData}
        env={env}
      />
    </div>
  )
};

export default Header;