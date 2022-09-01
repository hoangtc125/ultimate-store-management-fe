import { Alert, Calendar, Select, Row, Col, Radio } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const USMAccountCalendar = () => {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert message={`Ngày đã chọn: ${selectedValue?.format('DD/MM/YYYY')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} 
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
                justifyContent: "flex-end",
              }}
            >
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="medium"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Xem theo tháng</Radio.Button>
                    <Radio.Button value="year">Xem theo năm</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="medium"
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
                    size="medium"
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
        monthCellRender={(date) => {
          console.log(date)
        }}
      />
    </>
  );
};

export default USMAccountCalendar;