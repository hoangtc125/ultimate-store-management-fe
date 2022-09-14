import { Image, Space, Badge, Descriptions, InputNumber, Button, Tag } from "antd"
import openNotificationWithIcon from "../../../utils/notification"
import { useRef, useState } from "react"

const USMProduct = ({item, CartData, env}) => {
  // eslint-disable-next-line
  const [data, setData] = useState(item)
  const [idImage, setIdImage] = useState(0)
  const [cartData, setCartData] = CartData
  const inputNumberElement = useRef(null)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "start",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image src={data?.images[idImage]} 
            width={"90%"}
          />
        </div>
        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Descriptions 
            layout="vertical" bordered column={3}
            title={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>Thông tin sản phẩm</strong>
                <div>
                  <Button type="primary" 
                    onClick={() => {
                      let newCart = {...cartData}
                      newCart.products[data?.id] = parseInt(newCart.products[data?.id] || 0) + parseInt(inputNumberElement?.current.value)
                      setCartData(newCart)
                      openNotificationWithIcon(
                        'success',
                        'Thêm thành công',
                        'Sản phẩm đã được thêm vào giỏ hàng!'
                      )
                    }}
                  >
                    Thêm vào giỏ hàng 
                  </Button>
                  <InputNumber min={1} max={100} defaultValue={1} ref={inputNumberElement} onChange={(value) => {
                    console.log(value)
                  }}
                    style={{
                      width: "160px",
                    }}
                  />
                </div>
              </div>
            } 
            style={{
              width: "100%",
            }}
          >
            <Descriptions.Item label="Tên sản phẩm">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="Thương hiệu">{data?.brand}</Descriptions.Item>
            <Descriptions.Item label="Số lượng">{data?.quantity}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Badge status="processing" text={data?.is_disabled ? <Tag color='red'>Vô hiệu hóa</Tag> : <Tag color='green'>Bình thường</Tag>} />
            </Descriptions.Item>
            <Descriptions.Item label="Tên gọi khác" span={2}>
              {data?.nickname.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Giá nhập">{data?.priceIn}</Descriptions.Item>
            <Descriptions.Item label="Giá bán">{data?.priceOut}</Descriptions.Item>
            <Descriptions.Item label="Mã sản phẩm">{data?.id}</Descriptions.Item>
            <Descriptions.Item label="Ảnh sản phẩm" span={3}>
              <Space
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                }}
              >
                {data?.images.map((image, id) => {
                  return <Image key={id} src={image}
                    preview={false}
                    style={{
                      width: "100px",
                      cursor: "pointer",
                      opacity: id === idImage ? "1" : "0.5",
                    }}
                    onClick={() => setIdImage(id)}
                  />
                })}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  )
}

export default USMProduct