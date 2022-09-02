import { Table, Collapse } from 'antd';
const { Panel } = Collapse;

const columns = [
  {
    title: 'Từ tiếng Anh',
    dataIndex: 'en',
    key: 'en',
  },
  {
    title: 'Từ tiếng Việt',
    dataIndex: 'vi',
    key: 'vi',
  },
];

const data = [
  {
    key: '1',
    en: 'admin',
    vi: 'Chủ cửa hàng',
  },
  {
    key: '2',
    en: 'staff',
    vi: 'Nhân viên bán hàng',
  },
  {
    key: '3',
    en: 'enable',
    vi: 'Bình thường',
  },
  {
    key: '4',
    en: 'disabled',
    vi: 'Vô hiệu hóa',
  },
];

const USMNote = () => (
  <Collapse>
      <Panel header="Bảng phụ: Chuyển đổi các từ Anh - Việt" key="1"
        style={{
          alignItems: "center",
          width: "fit-content",
          boxShadow: "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
        }}
      >
        <Table
          columns={columns} dataSource={data} pagination={false}
          style={{
            width: "100%",
            padding: "10px 10px",
          }}
        />
      </Panel>
    </Collapse>
);

export default USMNote;