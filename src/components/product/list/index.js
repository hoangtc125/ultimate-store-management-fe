import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, GoldOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card, Popconfirm, message, Tag, Spin } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import * as API from '../../../constants/api'
import { isMode, isRole } from '../../../utils/check';
import Highlighter from 'react-highlight-words';
import USMCreateProduct from './create';
import USMUpdateProduct from './update';
import USMNote from './note';
import products from '../../../data/product';
import openNotificationWithIcon from '../../../utils/notification';
import { ProductResponse } from '../../../model/product';

const USMListProduct = ({CurrentUser, env}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    position: ['bottomCenter'],
  });
  const [data, setData] = useState([])
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [idSelected, setIdSelected] = useState()
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const searchInput = useRef(null);

  const showDrawerCreate = () => {
    setVisibleCreate(true);
  };

  const showDrawerUpdate = () => {
    setVisibleUpdate(true);
  };

  const handleDelete = (index) => {
    // eslint-disable-next-line
    if(isMode([MODE.NORMAL])) {
      setLoading(true)
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.PRODUCT_DISABLE + index, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': currentUser.token
        },
      })
      .then(response => {
        return response.json()})
      .then(dt => {
        // eslint-disable-next-line
        if(dt?.status_code != 200) {
          openNotificationWithIcon(
            'error',
            'Cập nhật không thành công',
            dt?.msg,
          )
        } else {
          const newData = data.map((e) => {
            if (e.id === index) {
              e.is_disabled = true
            }
            return e
          })
          setData(newData)
          message.success('Xóa thành công');
        }
        setLoading(false)
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Cập nhật không thành công',
          'Thông tin không được cập nhật!'
        )
        setLoading(false)
      });
    } else {
      const newData = data.map((e) => {
        if (e.id === index) {
          const newE = {...e}
          newE.is_disabled = true
          return newE
        } else {
          return e
        }
      })
      setData(newData)
      message.success('Xóa thành công');
    }
  }

  const USMAction = ({i}) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Tooltip title="Chỉnh sửa">
          <Button shape="circle" type="primary" ghost icon={<EditOutlined />} 
            onClick={() => {
              setIdSelected(i)
              showDrawerUpdate()
            }}
          />
        </Tooltip>
        <Tooltip title="Vô hiệu hóa">
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => handleDelete(i)}
            okText="Yes"
            cancelText="No"
            placement='bottom'
          >
            <Button shape="circle" danger ghost icon={<DeleteOutlined />} />
          </Popconfirm>
        </Tooltip>
      </div>
    )
  }
  
  useEffect(() => {
    if (isMode([MODE.TEST])) {
      let vals = products.map(product => {
        return {
          key: product.id,
          ...product,
        }
      })
      setData(vals)
    } else {
      const url = isRole([ROLE.ADMIN]) ? API.PRODUCT_GET_ALL : API.PRODUCT_GET_ALL_ACTIVATE
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + url, {
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          autoComplete={false}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            style={{
              width: 120,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{
              width: 90,
            }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Bộ lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  let columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tên gọi khác',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '20%',
      ...getColumnSearchProps('nickname'),
      render: (_, record) => {
        return record.nickname.join(", ")
      }
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      width: '10%',
      ...getColumnSearchProps('brand'),
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceOut',
      key: 'priceOut',
      width: '10%',
      ...getColumnSearchProps('priceOut'),
      sorter: (a, b) => a.priceOut - b.priceOut,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      ...getColumnSearchProps('quantity'),
      width: '8%',
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      width: '10%',
      ...getColumnSearchProps('images'),
      render: (_, record) => {
        return <Image src={record.images[0]} width={50}/>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_disabled',
      key: 'is_disabled',
      ...getColumnSearchProps('is_disabled'),
      sorter: (a, b) => b.is_disabled,
      sortDirections: ['descend', 'ascend'],
      width: '10%',
      render: (_, record) => {
        return record.is_disabled ? <Tag color='red'>Vô hiệu hóa</Tag> : <Tag color='green'>Bình thường</Tag>
      }
    },
  ];

  if (isRole([ROLE.ADMIN])) {
    columns.push({
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <USMAction i={record.id}/>
      ),
    })
  }

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "end"
        }}
      >
        {
          isRole([ROLE.ADMIN]) &&
          <div>
            <Button type="primary" icon={<PlusOutlined />} shape="round"
              style={{
                boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
              }}
              onClick={() => {
                showDrawerCreate()
              }}
            >
              Thêm sản phẩm
            </Button>
            <USMCreateProduct CurrentUser={CurrentUser} visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} data={data} setData={setData} env={env}/>
            <USMUpdateProduct CurrentUser={CurrentUser} visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} data={data} setData={setData} idSelected={idSelected} env={env}/>
          </div>
        }
        <USMNote />
      </div>
      <Spin spinning={loading}>
        <Table
          title={() => {
            return (
              <Space>
                <GoldOutlined style={{fontSize: "2rem"}}/> 
                <span>Danh sách sản phẩm trong cửa hàng ({data.length})</span>
              </Space>
            )
          }}
          bordered
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          style={{
            borderRadius: "10px",
            boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
            margin: "10px 0px",
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                  margin: 0,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                {
                  isRole([ROLE.ADMIN]) && 
                  <>
                    <Card title="Giá nhập vào">{record.priceIn}</Card>
                  </>
                }
                <Card title="Ảnh chi tiết">
                  <Space>
                    {record.images.map((image, id) => {
                      return <Image key={id} src={image} width={75}/>
                    })}  
                  </Space>  
                </Card>
              </div>
            ),
            rowExpandable: record => true,
          }}
        />
      </Spin>
    </div>
  );
};

export default USMListProduct;