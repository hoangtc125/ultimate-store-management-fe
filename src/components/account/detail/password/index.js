import { Button, Form, Input, message } from 'antd';
import * as API from '../../../../constants/api'
import * as MODE from '../../../../constants/mode'
import { isMode } from '../../../../utils/check';
import openNotificationWithIcon from '../../../../utils/notification';

const USMAccountPassword = ({currentUser, IDAccountUpdate}) => {
  const onFinish = (values) => {
    if (isMode([MODE.NORMAL])) {
      const url = IDAccountUpdate ? API.ACCOUNT_UPDATE_PASSWORD_STAFF + IDAccountUpdate : API.ACCOUNT_UPDATE_PASSWORD
      fetch(API.DOMAIN + url, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': currentUser.token
        },
        body: JSON.stringify(values),
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
          message.success("Cập nhật thành công")
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          'error',
          'Cập nhật không thành công',
          'Thông tin không được cập nhật!'
        )
      });
    } else {
      message.success("Cập nhật thành công")
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      autoComplete="off"
    >
      {!IDAccountUpdate && <Form.Item
        label="Mật khẩu cũ"
        name="old_password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>}

      <Form.Item
        label="Mật khẩu mới"
        name="new_password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="repeat_password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" shape='round'>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default USMAccountPassword;