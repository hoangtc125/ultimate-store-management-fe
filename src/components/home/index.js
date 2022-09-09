import { useEffect, useRef, useState } from "react"
import * as MODE from '../../constants/mode'
import { isMode } from "../../utils/check"
import USMItemProduct from "./item"
import { Input, Pagination, Card, Image, Empty } from 'antd';
import products from "../../data/product";
import images from "../../assets/images";
const { Search } = Input;

const USMHome = ({CartData}) => {
  const [data, setData] = useState([])
  const [pageData, setPageData] = useState([])
  const [current, setCurrent] = useState(1);
  const searchElement = useRef(null)

  const onChange = (page) => {
    setCurrent(page);
    if (isMode([MODE.TEST])) {
      setPageData(products.slice((page - 1) * 12, page * 12))
    }
  };

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setData(products)
      setPageData(products.slice((current - 1) * 12, current * 12))
    }
    // eslint-disable-next-line
  }, [])

  const handleSearch = (value) => {
    const keyword = value.trim()
    if (!keyword) {
      if (isMode([MODE.TEST])) {
        setPageData(products.slice((current - 1) * 12, current * 12))
      }
      return
    }
    const res = data.filter(element => {
      if (String(element?.name).includes(keyword)) {
        return true
      } else {
        return false
      }
    })
    setPageData(res)
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        hoverable
        style={{
          width: "80%",
          marginBottom: "10px",
          borderRadius: "100px",
          padding: "-10px",
        }}
        onClick={(e) => {
          searchElement?.current.focus()
        }}
      >
        <Search
          ref={searchElement}
          placeholder="Nhập sản phẩm muốn tìm kiếm"
          allowClear
          bordered={false}
          enterButton="Tìm kiếm"
          onSearch={(value) => handleSearch(value)}
          prefix={
            <Image src={images.logo} width={50} preview={false} 
              style={{
                margin: "-10px 20px -10px -10px"
              }}
            />
          }
          style={{
            flexGrow: 1,
            width: "100%",
          }}
        />
      </Card>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {pageData.map((item, id) => {
          return <USMItemProduct key={id} item={item} CartData={CartData}/>
        })}
        {data.length === 0 && 
          <Empty 
            style={{
              padding: "50px",
              margin: "50px",
            }}
          />
        }
      </div>
      <Pagination current={current} onChange={onChange} total={data.length} position={['bottomCenter']}/>
    </div>
  )
}

export default USMHome