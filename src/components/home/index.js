import { useEffect, useState } from "react"
import * as MODE from '../../constants/mode'
import { isMode } from "../../utils/check"
import USMItemProduct from "./item"
import { Input, Pagination } from 'antd';
import { ProductResponse } from "../../model/product";
import images from "../../assets/images";
const { Search } = Input;

const fakeData = []

for (let i = 0; i < 20; i++) {
  const product = new ProductResponse(
    {
      name: "name " + i,
      nickname: "nickname " + i,
      priceIn: i,
      brand: "brand " + i,
      quantity: i,
      priceOut: i,
      images: [images.default, images.logo, images.default, images.logo, images.default, images.logo],
      is_disabled: "enable",
      id: i,
    }
  )
  fakeData.push(product)
}

const USMHome = () => {
  const [data, setData] = useState([])
  const [pageData, setPageData] = useState([])
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
    if (isMode([MODE.TEST])) {
      setPageData(fakeData.slice((page - 1) * 12, page * 12))
    }
  };

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setData(fakeData)
      setPageData(fakeData.slice((current - 1) * 12, current * 12))
    }
    // eslint-disable-next-line
  }, [])

  const handleSearch = (value) => {
    const keyword = value.trim()
    if (!keyword) {
      if (isMode([MODE.TEST])) {
        setPageData(fakeData.slice((current - 1) * 12, current * 12))
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
      <Search
        placeholder="Nhập sản phẩm muốn tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={(value) => handleSearch(value)}
        style={{
          width: "80%",
          marginBottom: "10px",
        }}
      />
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
          return <USMItemProduct key={id} item={item} />
        })}
      </div>
      <Pagination current={current} onChange={onChange} total={data.length} position={['bottomCenter']}/>
    </div>
  )
}

export default USMHome