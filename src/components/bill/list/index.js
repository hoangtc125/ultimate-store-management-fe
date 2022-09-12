import { SearchOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, DatePicker, Modal } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { getProducts } from '../../../utils/cart';
import moment from 'moment'
import USMBillDetail from '../detail';
import { splitMoney } from '../../../utils/money';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Search } = Input;

const USMBill = ({BillData}) => {
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
  const [billData, setBillData] = BillData
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleView = (index) => {
    setItemSelected(data.find(bill => index === bill.id))
    showModal()
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
        <Button
          type='primary'
          onClick={() => handleView(i)}
        >
          Xem chi tiết
        </Button>
      </div>
    )
  }

  const updateData = async (b) => {
    let newBillData = []
    for (let i = 0; i < b.length; i++) {
      const newProducts = await getProducts(b[i]) || []
      let vals = newProducts.map(product => {
        return {
          key: product?.id,
          itemQuantity: b[i].products[product?.id],
          itemSubPrice: b[i].products[product?.id] * product?.priceOut,
          ...product,
        }
      })
      newBillData.push({key: b[i].id ,...b[i], productsDetail: vals})
    }
    console.log(newBillData)
    setData(newBillData)
  }
  
  useEffect(() => {
    updateData(billData)
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
      width: '8%',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
      width: '20%',
      ...getColumnSearchProps('customer'),
      sorter: (a, b) => a.id - b.id,
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
      title: 'Sản phẩm đã mua',
      dataIndex: 'productsDetail',
      key: 'productsDetail',
      width: '20%',
      ...getColumnSearchProps('productsDetail'),
      render: (_, record) => {
        return (
          (record?.productsDetail || []).map(product => {
            return product?.name
          }).join(", ")
        )
      }
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      ...getColumnSearchProps('totalPrice'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '15%',
      render: (_, record) => {
        return splitMoney(record.totalPrice)
      }
    },
    {
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
                <SnippetsOutlined style={{fontSize: "2rem"}}/> 
                <span>Danh sách hóa đơn ({Object.keys(billData).length})</span>
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
      />
      <Modal title="Chi tiết hóa đơn" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={"70%"} destroyOnClose={true}>
        <USMBillDetail Data={[itemSelected, setItemSelected]}/>
      </Modal>
    </div>
  );
};

export default USMBill;