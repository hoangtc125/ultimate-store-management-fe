import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card, DatePicker, Popconfirm, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import { isMode, isRole } from '../../../utils/check';
import Highlighter from 'react-highlight-words';
import USMCreateAccount from './create';
import USMUpdateAccount from './update';
import USMNote from './note';
import accounts from '../../../data/account';
import moment from 'moment'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMListAccount = () => {
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
  const searchInput = useRef(null);

  const showDrawerCreate = () => {
    setVisibleCreate(true);
  };

  const showDrawerUpdate = () => {
    setVisibleUpdate(true);
  };

  
  const USMAction = ({i}) => {
    const handleDelete = (index) => {
      // eslint-disable-next-line
      const newData = data.filter((e) => {
        if (e.id !== index) {
          return true
        } else {
          return false
        }
      })
      setData(newData)
      message.success('Xóa thành công');
    }

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
      const vals = accounts.map(account => {
        return {
          key: account.id,
          ...account,
        }
      })
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
      render: (_, record) => {
        return <Image src={record.avatar} width={50}/>
      }
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
          alignItems: "end",
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
              Thêm tài khoản
            </Button>
            <USMCreateAccount visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} data={data} setData={setData}/>
            <USMUpdateAccount visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} data={data} setData={setData} idSelected={idSelected}/>
          </div>
        }
        <USMNote />
      </div>
      <Table
        title={() => {
          return (
            <Space>
              <UsergroupAddOutlined style={{fontSize: "2rem"}}/> 
              <span>Danh sách nhân viên trong cửa hàng</span>
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
                  <Card title="Tên đăng nhập">{record.username}</Card>
                  <Card title="Hệ số lương">{record.ratio_salary}</Card>
                  <Card title="Thời điểm tạo tài khoản">{record.created_at}</Card>
                  <Card title="Mật khẩu">{record.hashed_password}</Card>
                </>
              }
              <Card title="Ngày sinh"><DatePicker format={dateFormatList} value={moment(record?.birthday, dateFormatList)} disabled /></Card>
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