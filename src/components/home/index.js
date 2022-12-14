import { CameraOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import * as API from '../../constants/api'
import * as MODE from '../../constants/mode'
import { isMode } from "../../utils/check"
import USMItemProduct from "./item"
import { Input, Pagination, Card, Image, Empty, Space, Button } from 'antd';
import products from "../../data/product";
import images from "../../assets/images";
import { ProductResponse } from "../../model/product"
import openNotificationWithIcon from "../../utils/notification";
import USMUpload from "../utils/upload"
const { Search } = Input;

const USMHome = ({CurrentUser, CartData, env}) => {
  const [data, setData] = useState([])
  const [pageData, setPageData] = useState([])
  const [current, setCurrent] = useState(1);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(12)
  const searchElement = useRef(null)
  const [usmImages, setUsmImages] = useState([])

  const predict = () => {
    fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.CAMERA_PREDICT, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': currentUser.token,
      },
      body: JSON.stringify(usmImages.map(element => {
        return String(element).split('data:image/jpeg;base64,')[1]
      }))
    })
    .then(response => {
      return response.json()})
    .then(data => {
      // eslint-disable-next-line
      if(data?.status_code != 200) {
        openNotificationWithIcon(
          'error',
          'Tìm không thành công',
          data?.msg,
        )
      } else {
        handleSearch(data?.data[0])
      }
    })
    .catch((error) => {
      openNotificationWithIcon(
        'error',
        'Lỗi hệ thống',
        'Tìm không thành công!'
      )
    });
  }

  const onChange = (page) => {
    setCurrent(page);
    if (isMode([MODE.TEST])) {
      setPageData(products.slice((page - 1) * pageSize, page * pageSize))
    } else {
      setPageData(data.slice((page - 1) * pageSize, page * pageSize))
    }
  };

  useEffect(() => {
    if (isMode([MODE.TEST])) {
      setData(products)
      setPageData(products.slice((current - 1) * pageSize, current * pageSize))
    } else {
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.PRODUCT_GET_ALL_ACTIVATE, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': currentUser.token,
        },
      })
      .then(response => {
        return response.json()})
      .then(data => {
        // eslint-disable-next-line
        if(data?.status_code != 200) {
          openNotificationWithIcon(
            'error',
            'Cập nhật không thành công',
            data?.msg,
          )
        } else {
          const vals = data?.data.map(element => {
            const newProductResponse = new ProductResponse({
              ...element, key: element.id,
            })
            return newProductResponse
          })
          setData(vals)
          setPageData(vals.slice((current - 1) * pageSize, current * pageSize))
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Cập nhật không thành công',
          'Thông tin không được cập nhật!'
        )
      });
    }
    // eslint-disable-next-line
  }, [])

  const handleSearch = (value) => {
    const keyword = value.trim()
    if (!keyword) {
      setPageData(data.slice((current - 1) * pageSize, current * pageSize))
      return
    }
    const res = data.filter(element => {
      if (String(element?.name).includes(keyword) || String(element?.id).includes(keyword)) {
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
            width: "95%",
          }}
        />
      </Card>
      <Space>
        <USMUpload CurrentUser={CurrentUser} usmImages={usmImages} setUsmImages={setUsmImages} env={env}/> 
        <Button shape="round" type="link" danger icon={<CameraOutlined style={{fontSize: "2rem"}} />}
          onClick={() => predict()}
        >Tìm kiếm bằng hình ảnh</Button>
      </Space>
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
          return <USMItemProduct key={id} item={item} CartData={CartData} env={env}/>
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
      <Pagination current={current} onChange={onChange} total={data.length - 1} position={['bottomCenter']}/>
    </div>
  )
}

export default USMHome