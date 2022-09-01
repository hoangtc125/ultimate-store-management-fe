import { ShoppingCartOutlined } from '@ant-design/icons' 
import { Space } from 'antd'

const USMCart = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ShoppingCartOutlined 
          style={{
            fontSize: "6rem",
          }}
        />
        <h1>Giỏ hàng</h1>
      </Space>
    </div>
  )
}

export default USMCart