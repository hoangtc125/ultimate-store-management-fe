import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import { isMode, isRole } from '../../../utils/check';
import Highlighter from 'react-highlight-words';
import USMCreateProduct from './create';
import USMUpdateProduct from './update';
import USMNote from './note';
import { ProductResponse } from '../../../model/product'
import images from '../../../assets/images';

const USMListProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([])
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [idSelected, setIdSelected] = useState()
  const searchInput = useRef(null);

  const showDrawerCreate = () => {
    setVisibleCreate(true);
  };

  const showDrawerUpdate = () => {
    setVisibleUpdate(true);
  };

  const handleDelete = (index) => {
    // eslint-disable-next-line
    const newData = data.filter((e) => {
      if (e.id !== index) {
        return e
      }
    })
    setData(newData)
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
        <Tooltip title="Xóa">
          <Button shape="circle" danger ghost icon={<DeleteOutlined />} 
            onClick={() => handleDelete(i)}
          />
        </Tooltip>
      </div>
    )
  }
  
  useEffect(() => {
    if (isMode([MODE.TEST])) {
      let vals = []
      for (let i = 0; i < 16; i++) {
        const product = new ProductResponse(
          {
            name: "name " + i,
            nickname: "nickname " + i,
            priceIn: i,
            brand: "brand " + i,
            quantity: i,
            priceOut: i,
            images: [images.default, images.default, images.default, images.default, images.default, images.default],
            is_disabled: "enable",
            id: i,
          }
        )
        vals.push({
          key: i,
          ...product, 
        });
      }
      setData(vals)
    }
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
            size="small"
            style={{
              width: 120,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xóa
          </Button>
          <Button
            type="link"
            size="small"
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
      width: '20%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.role - b.role,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tên gọi khác',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '15%',
      ...getColumnSearchProps('nickname'),
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
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      ...getColumnSearchProps('quantity'),
      width: '8%',
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
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '10%',
    },
  ];

  if (isRole([ROLE.ADMIN])) {
    columns.push({
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <USMAction i={record.key}/>
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
            <USMCreateProduct visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} data={data} setData={setData}/>
            <USMUpdateProduct visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} data={data} setData={setData} idSelected={idSelected}/>
          </div>
        }
        <USMNote />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        size="large"
        style={{
          borderRadius: "10px",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
          margin: "10px 0px",
          padding: "0px 10px",
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
    </div>
  );
};

export default USMListProduct;