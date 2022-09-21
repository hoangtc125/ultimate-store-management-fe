import { SearchOutlined, SnippetsOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, DatePicker, Modal, Spin, Tag, Timeline } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import USMBillDetail from '../detail';
import { splitMoney } from '../../../utils/money';
import * as MODE from '../../../constants/mode'
import * as API from '../../../constants/api'
import openNotificationWithIcon from '../../../utils/notification';
import { isMode } from '../../../utils/check';
import { BILL_STATUS } from '../../../constants/status';
import USMBillRefund from '../detail/refund';
import USMBillPay1 from '../detail/pay1';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const USMBill = ({CurrentUser, BillData, env, BillRelationData}) => {
  // eslint-disable-next-line
  const [billRelationData, setBillRelationData] = BillRelationData
  // eslint-disable-next-line
  const [currentUser, setCurrentUSer] = CurrentUser
  const [itemSelected, setItemSelected] = useState()
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    position: ['bottomCenter'],
  });
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [billData, setBillData] = isMode([MODE.TEST]) ? BillData : useState([])
  const [loading, setLoading] = useState(false)
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleReFund, setIsModalVisibleReFund] = useState(false);
  const [isModalVisiblePay1, setIsModalVisiblePay1] = useState(false);

  useEffect(() => {
    if(isMode([MODE.NORMAL])) {
      setLoading(true)
      fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.BILL_GET_ALL, {
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
          setBillData(data?.data || [])
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

  const showModal = (visibleModal) => {
    visibleModal(true);
  };

  const handleOk = (visibleModal) => {
    visibleModal(false);
  };

  const handleCancel = (visibleModal) => {
    visibleModal(false);
  };

  const handleView = (setIsModalVisible, index) => {
    setItemSelected(data.find(bill => index === bill.id))
    showModal(setIsModalVisible)
  }

  const USMAction = ({record}) => {
    return (
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {record.status === 'debt' &&
        <Button type='secondary' danger 
          icon={
            <SafetyCertificateOutlined 
              style={{fontSize: "1.5rem"}}
            />
          }
          onClick={() => {
            setItemSelected(data.find(bill => record.key === bill.id))
            showModal(setIsModalVisiblePay1)
          }}
        > 
          Trả nợ
        </Button>}
        {(record.status === 'pay' || record.status === 'debt') &&
        <Button type='secondary' danger 
          icon={
            <SafetyCertificateOutlined 
              style={{fontSize: "1.5rem"}}
            />
          }
          onClick={() => {
            setItemSelected(data.find(bill => record.key === bill.id))
            showModal(setIsModalVisibleReFund)
          }}
        > 
          Hoàn trả
        </Button>}
        <Button
          type='primary'
          onClick={() => handleView(setIsModalVisible, record.key)}
        >
          Xem chi tiết
        </Button>
      </Space>
    )
  }

  useEffect(() => {
    const newBillData = billData.map(element => {
      return {key: element.id, ...element}
    })
    setData(newBillData)
    // eslint-disable-next-line
  }, [billData])

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
      title: 'Mã hóa đơn',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => String(a.id).localeCompare(String(b.id)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
      width: '20%',
      ...getColumnSearchProps('customer'),
      sorter: (a, b) => a?.customer?.name.localeCompare(b?.customer?.name),
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => {
        return record?.customer?.name
      }
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      ...getColumnSearchProps('created_at'),
      render: (_, record) => {
        return <DatePicker format={dateFormatList} value={moment(record?.created_at, dateFormatList)} disabled />
      }
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a?.status.localeCompare(b?.status),
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => {
        return (
          // eslint-disable-next-line
          <Tag color={BILL_STATUS[record?.status]?.color}>{BILL_STATUS[record?.status]?.content}</Tag>
        )
      }
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      ...getColumnSearchProps('totalPrice'),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ['descend', 'ascend'],
      width: '10%',
      render: (_, record) => {
        if (record.status === 'pay1') {
          return splitMoney(record.customer.pricePay)
        } else if (record.status === 'refund') {
          return splitMoney(-record.totalPrice)
        } else if (record.status === 'debt') {
          return splitMoney(record.customer.pricePay)
        } else {
          return splitMoney(record.totalPrice)
        }
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: '25%',
      render: (_, record) => (
        <USMAction record={record}/>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
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
                  <SnippetsOutlined style={{fontSize: "2rem"}}/>
                  <span>Danh sách hóa đơn ({Object.keys(billData).length})</span>
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
          expandable={{
            expandedRowRender: (record) => (
              <Timeline mode={'left'}>
                {isMode([MODE.TEST]) && billRelationData.find(element => element?.id === record?.id)?.childs.map(element => {
                  return (
                    <Timeline.Item key={element?.id} label={element?.created_at}>
                      <Tag color={BILL_STATUS[element?.status]?.color}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleView(setIsModalVisible, element.id)
                        }}
                      >{BILL_STATUS[element?.status]?.content}</Tag>
                    </Timeline.Item>
                  )
                })}
              </Timeline>
            ),
            rowExpandable: (record) => {
              if(isMode([MODE.TEST])) {
                return billRelationData.find(element => element?.id === record?.id)
              } else {
                return false
              }
            },
          }}
        />
      </Spin>
      <Modal title="Chi tiết hóa đơn" visible={isModalVisible} onOk={() => handleOk(setIsModalVisible)} onCancel={() => handleCancel(setIsModalVisible)} width={"70%"} destroyOnClose={true}>
        <USMBillDetail Data={[itemSelected, setItemSelected]} env={env}/>
      </Modal>
      <Modal title="Hoàn trả sản phẩm" visible={isModalVisibleReFund} onCancel={() => handleCancel(setIsModalVisibleReFund)} width={"70%"} destroyOnClose={true} 
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
        okText=' '
        cancelText=' '
      >
        <USMBillRefund ItemSelected={itemSelected} env={env} BillData={[billData, setBillData]} setIsModalVisibleReFund={setIsModalVisibleReFund} BillRelationData={BillRelationData}/>
      </Modal>
      <Modal title="Trả nợ" visible={isModalVisiblePay1} onCancel={() => handleCancel(setIsModalVisiblePay1)} width={"70%"} destroyOnClose={true} 
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
        okText=' '
        cancelText=' '
      >
        <USMBillPay1 ItemSelected={itemSelected} env={env} BillData={[billData, setBillData]} setIsModalVisiblePay1={setIsModalVisiblePay1} BillRelationData={BillRelationData}/>
      </Modal>
    </div>
  );
};

export default USMBill;