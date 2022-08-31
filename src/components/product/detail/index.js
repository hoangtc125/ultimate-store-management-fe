import { Image, Space, Badge, Descriptions } from "antd"
import { useEffect, useState } from "react"
import images from '../../../assets/images'
import * as MODE from '../../../constants/mode'
import { isMode } from '../../../utils/check'
import { ProductResponse } from '../../../model/product'

const USMProduct = () => {
  const [data, setData] = useState()
  const [idImage, setIdImage] = useState(0)

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      const product = new ProductResponse(
        {
          name: "name",
          nickname: "nickname",
          priceIn: 1,
          brand: "brand",
          quantity: 1,
          priceOut: 1,
          images: [images.default, images.logo, images.default, images.logo, images.default, images.logo],
          is_disabled: "enable",
          id: 1,
        }
      )
      setData(product)
    }
  }, [])

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
          <Descriptions title="Thông tin sản phẩm" layout="vertical" bordered
            column={3}
            style={{
              width: "100%",
            }}
          >
            <Descriptions.Item label="Tên sản phẩm">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="Thương hiệu">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Số lượng">YES</Descriptions.Item>
            <Descriptions.Item label="Thời gian nhập hàng">2018-04-24 18:00:00</Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              <Badge status="processing" text="Bình thường" />
            </Descriptions.Item>
            <Descriptions.Item label="Giá nhập">$80.00</Descriptions.Item>
            <Descriptions.Item label="Giá bán">$20.00</Descriptions.Item>
            <Descriptions.Item label="Mã sản phẩm">M</Descriptions.Item>
            <Descriptions.Item label="Ảnh sản phẩm">
              <Space
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "10px",
                  overflowX: "auto",
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