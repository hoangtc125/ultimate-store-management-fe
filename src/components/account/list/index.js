import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip, Image, Card, DatePicker, Popconfirm, message, Tag, Spin } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import * as MODE from '../../../constants/mode'
import * as ROLE from '../../../constants/role'
import * as API from '../../../constants/api'
import openNotificationWithIcon from '../../../utils/notification';
import { isMode, isRole } from '../../../utils/check';
import Highlighter from 'react-highlight-words';
import USMCreateAccount from './create';
import USMUpdateAccount from './update';
import USMNote from './note';
import accounts from '../../../data/account';
import moment from 'moment'
import { AccountResponse } from '../../../model/account';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMListAccount = ({CurrentUser, env}) => {
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
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const [loading, setLoading] = useState(false)

  const showDrawerCreate = () => {
    setVisibleCreate(true);
  };

  const showDrawerUpdate = () => {
    setVisibleUpdate(true);
  };

  const USMAction = ({i, disabled}) => {
    const handleDelete = (index) => {
      // eslint-disable-next-line
      if (isMode([MODE.NORMAL])) {
        setLoading(true)
        fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.ACCOUNT_DISABLE + index, {
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
      }
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
          <Button loading={loading} shape="circle" type="primary" ghost icon={<EditOutlined />} 
            onClick={() => {
              setIdSelected(i)
              showDrawerUpdate()
            }}
            disabled={disabled}
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
            <Button loading={loading} shape="circle" danger ghost icon={<DeleteOutlined />} disabled={disabled}/>
          </Popconfirm>
        </Tooltip>
      </div>
    )
  }
  
  useEffect(() => {
    if (isMode([MODE.TEST])) {
      const vals = accounts.map(account => {
        return new AccountResponse({
          key: account.id,
          ...account,
        })
      })
      setData(vals)
    } else {
      setLoading(true)
      const url = isRole([ROLE.ADMIN]) ? API.ACCOUNTS : API.ACCOUNTS_AVAILABLE
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
            const newAccountResponse = new AccountResponse({
              ...element, key: element.id
            })
            return newAccountResponse
          })
          setData(vals)
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
      sorter: (a, b) => String(a.id).localeCompare(String(b.id)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '20%',
      ...getColumnSearchProps('fullname'),
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
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
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => {
        return record.role === ROLE.ADMIN ? <Tag color='brown'>Chủ cửa hàng</Tag> : <Tag color='black'>Nhân viên bán hàng</Tag>
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
        <USMAction i={record.id} disabled={record.role === ROLE.ADMIN}/>
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
            <USMCreateAccount CurrentUser={CurrentUser} visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} data={data} setData={setData} env={env}/>
            <USMUpdateAccount CurrentUser={CurrentUser} visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} data={data} setData={setData} idSelected={idSelected} env={env}/>
          </div>
        }
        <USMNote />
      </div>
      <Spin spinning={loading}>
        <Table
          title={() => {
            return (
              <Space>
                <UsergroupAddOutlined style={{fontSize: "2rem"}}/>
                <span>Danh sách nhân viên trong cửa hàng ({data.length})</span>
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
                    <Card title="Thời điểm tạo tài khoản">{new Date(record.created_at * 1000).toLocaleDateString('en-GB')}</Card>
                  </>
                }
                <Card title="Ngày sinh"><DatePicker format={dateFormatList} value={moment(record?.birthday, dateFormatList)} disabled /></Card>
                <Card title="Thông tin khác">{record.profile}</Card>
              </div>
            ),
            rowExpandable: record => true,
          }}
        />
      </Spin>
    </div>
  );
};

export default USMListAccount;