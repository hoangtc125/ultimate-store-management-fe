import { SearchOutlined, DeleteOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card, Popconfirm, InputNumber } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../constants/mode'
import { isMode } from '../../utils/check';
import Highlighter from 'react-highlight-words';
import { moneyToText, splitMoney } from '../../utils/money';
import { getProducts } from '../../utils/cart';
const { Search } = Input;

const USMListProduct = ({CartData}) => {
  // const [idSelected, setIdSelected] = useState()
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    position: ['bottomCenter'],
  });
  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartData, setCartData] = CartData
  const searchInput = useRef(null);

  const handleDelete = (index) => {
    let newCart = {...cartData}
    delete newCart.products[index]
    setCartData(newCart)
    updateData(newCart)
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
        <Tooltip title="Xóa">
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

  const updateData = (c) => {
    const newProducts = getProducts(c) || []
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
    if (isMode([MODE.TEST])) {
      updateData(cartData)
    }
  }, [cartData])

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
      title: 'Mã số sản phẩm',
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
      width: '20%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.role - b.role,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hình ảnh sản phẩm',
      dataIndex: 'images',
      key: 'images',
      width: '10%',
      ...getColumnSearchProps('images'),
      render: (_, record) => {
        return <Image src={record.images[0]} width={50}/>
      }
    },
    {
      title: 'Giá bán 1 sản phẩm',
      dataIndex: 'priceOut',
      key: 'priceOut',
      width: '15%',
      ...getColumnSearchProps('priceOut'),
      render: (_, record) => {
        return splitMoney(record.priceOut)
      }
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'itemQuantity',
      key: 'itemQuantity',
      ...getColumnSearchProps('itemQuantity'),
      width: '15%',
      render: (_, record) => {
        return <InputNumber min={1} max={100} value={record.itemQuantity} onChange={(value) => {
          let newCart = {...cartData}
          newCart.products[record.id] = value
          setCartData(newCart)
          updateData(newCart)
        }} />
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'itemSubPrice',
      key: 'itemSubPrice',
      ...getColumnSearchProps('itemSubPrice'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '15%',
      render: (_, record) => {
        return splitMoney(record.itemSubPrice)
      }
    },{
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <USMAction i={record.key}/>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        title={() => {
          return (
            <Space
              style={{
                width: "100%",
                dispaly: "flex",
                flexDirection: "row",
                justifyContent :"space-between",
                alignItems: "center",
              }}
            >
              <Space>
                <ShoppingCartOutlined style={{fontSize: "2rem"}}/> 
                <span>Giỏ hàng ({Object.keys(cartData?.products || []).length})</span>
              </Space>
              <Search
                placeholder="Nhập sản phẩm"
                allowClear
                enterButton="Tìm kiếm nhanh"
                onSearch={(value) => handleSearch(value)}
                style={{
                  width: "100%",
                }}
              />
            </Space>
          )
        }}
        footer={() => {
          return (
            <Space
              style={{
                fontSize: "1.5rem",
              }}
            >
              <DollarOutlined style={{
                fontSize: "3rem",
              }}/> 
              <Space
                style={{
                  margin: "0px 10px",
                }}
              >
                <span>Tổng tiền:</span>
                <strong>{splitMoney(totalPrice)}</strong>
              </Space>
              <Space
                style={{
                  margin: "0px 10px",
                }}
              >
                <span>Bằng chữ:</span>
                <i>{moneyToText(totalPrice)}</i>
              </Space>
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
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
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
    </div>
  );
};

export default USMListProduct;