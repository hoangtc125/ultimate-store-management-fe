import { useEffect, useState } from "react"
import * as MODE from '../../constants/mode'
import { isMode } from "../../utils/check"
import USMItemProduct from "./item"
import { Input, Pagination } from 'antd';
const { Search } = Input;

const fakeData = []

for (let i = 0; i < 20; i++) {
  fakeData.push({
    title: "product " + i,
    description: "description " + i,
  })
}

const USMHome = () => {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
    setData(fakeData.slice((page - 1) * 12, page * 12))
  };

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setData(fakeData.slice((current - 1) * 12, current * 12))
    }
    // eslint-disable-next-line
  }, [])

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
        onSearch={() => {}}
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
        {data.map((item, id) => {
          return <USMItemProduct key={id} title={item.title} description={item.description} />
        })}
      </div>
      <Pagination current={current} onChange={onChange} total={data.length}/>
    </div>
  )
}

export default USMHome