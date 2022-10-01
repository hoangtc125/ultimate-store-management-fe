import { Alert, Calendar, Select, Row, Col, Radio, Typography, Button, DatePicker } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, CloseCircleTwoTone, SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useState } from 'react';
const { Text } = Typography;

const USMAccountCalendar = ({CurrentUser, env}) => {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const getData = (value) => {
    let data;

    if (value.format('DD/MM/YYYY') === '27/09/2022') {
      data = (
        <>
          <CheckCircleTwoTone style={{fontSize: "2rem"}} twoToneColor="#45d200"/>
          <Text>Đã điểm danh</Text>
          <Text type="secondary">Lúc 07:00:00</Text>
        </>
      )
    }

    if (value.format('DD/MM/YYYY') === '28/09/2022') {
      data = (
        <>
          <ClockCircleTwoTone style={{fontSize: "2rem"}} twoToneColor="#ffaa00"/>
          <Text>Đi muộn</Text>
          <Text type="secondary">Lúc 07:00:01</Text>
        </>
      )
    }

    if (value.format('DD/MM/YYYY') === '29/09/2022') {
      data = (
        <>
          <CloseCircleTwoTone style={{fontSize: "2rem"}} twoToneColor="#ff06009c"/>
          <Text>Vắng</Text>
          <Text type="secondary">Không phép</Text>
        </>
      )
    }

    if (value.format('DD/MM/YYYY') === new Date().toLocaleDateString('en-GB')) {
      data = (
        <>
          <Button type="link" shape='round' icon={<SendOutlined style={{fontSize: "2rem"}}/>}>Điểm danh</Button>
        </>
      )
    }
  
    return data;
  };

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  
  const getMonthData = (value) => {
    if (value.month() === 9) {
      return 2022;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const data = getData(value)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {data}
      </div>
    );
  };

  return (
    <>
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange}
        dateCellRender={dateCellRender} monthCellRender={monthCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          const months = [];

          for (let i = 1; i <= 12; i++) {
            months.push('Tháng ' + i);
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];

          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          return (
            <div
              style={{
                padding: 8,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Alert message={`Ngày đã chọn: ${selectedValue?.format('DD/MM/YYYY')}`} />
              <DatePicker.RangePicker 
                ranges={{
                  'Hôm nay': [moment(), moment()],
                  'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                  'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                  'Bắt đầu 1 tuần': [moment(), moment().add(1, 'w')],
                  'Bắt đầu 1 tháng': [moment(), moment().add(1, 'M')],
                }}
                allowClear={false}
                open={true}
                bordered={false}
              />
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Xem theo tháng</Radio.Button>
                    <Radio.Button value="year">Xem theo năm</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
      />
    </>
  );
};

export default USMAccountCalendar;