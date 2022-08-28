import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import { isMode, isRole } from '../../../utils/check';
import Highlighter from 'react-highlight-words';
import USMCreateAccount from './create';
import { AccountResponse } from '../../../model/account'
import images from '../../../assets/images';

const USMListAccount = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([])
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [placemenCreate, setPlacementCreate] = useState('right')
  const [title, setTitle] = useState("Tạo mới tài khoản")
  const searchInput = useRef(null);

  const showDrawer = () => {
    setVisibleCreate(true);
  };

  const handleDelete = (index) => {
    console.log(index)
  }
  
  useEffect(() => {
    if (isMode([MODE.TEST])) {
      let vals = []
      for (let i = 0; i < 16; i++) {
        const account = AccountResponse(
          "string " + i,
          "string " + i,
          i,
          "string " + i,
          "string " + i,
          "string " + i,
          "string " + i,
          <Image src={images.default} width={50}/>,
          "string " + i,
          "string " + i,
          "string " + i,
          "string " + i,
          i,
        )
        vals.push({
          key: i,
          ...account, 
          action: 
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
                    setPlacementCreate('left')
                    setTitle("Chỉnh sửa tài khoản")
                    showDrawer()
                  }}
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <Button shape="circle" danger ghost icon={<DeleteOutlined />} 
                  onClick={() => handleDelete(i)}
                />
              </Tooltip>
            </div>,
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
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '20%',
      ...getColumnSearchProps('fullname'),
      sorter: (a, b) => a.role - b.role,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Ảnh đai diện',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '10%',
      ...getColumnSearchProps('avatar'),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
      width: '8%',
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
    })
  }

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
    });
  };

  return (
    <div>
      {
        isRole([ROLE.ADMIN]) &&
        <div>
          <Button type="primary" icon={<PlusOutlined />} shape="round"
            style={{
              boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
            }}
            onClick={() => {
              setPlacementCreate('right')
              setTitle("Tạo mới tài khoản")
              showDrawer()
            }}
          >
            Thêm tài khoản
          </Button>
          <USMCreateAccount visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} placemenCreate={placemenCreate} title={title}/>
        </div>
      }
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
                  <Card title="Tên đăng nhập">{record.username}</Card>
                  <Card title="Hệ số lương">{record.ratio_salary}</Card>
                  <Card title="Thời điểm tạo tài khoản">{record.created_at}</Card>
                  <Card title="Mật khẩu">{record.hashed_password}</Card>
                </>
              }
              <Card title="Ngày sinh">{record.birthday}</Card>
              <Card title="Thông tin khác">{record.profile}</Card>
            </div>
          ),
          rowExpandable: record => true,
        }}
      />
    </div>
  );
};

export default USMListAccount;