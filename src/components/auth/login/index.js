import Form from 'react-bootstrap/Form';
import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGears} from '@fortawesome/free-solid-svg-icons'

import {images} from '../../../assets/images'

const cx = classNames.bind(styles)

const USMLogin = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("panel")}>
        <div className={cx("title")}>
          <div className={cx("message")}>
            <strong>Trang quản lý và cấu hình cài đặt sản phẩm</strong>
            <br/>
            <strong>bãi đỗ xe thông minh TechPro Smart Parking</strong>
          </div>
          <FontAwesomeIcon className={cx("icon-gear", 'o-50')} icon={faGears} />
        </div>
        <div className="images">
          <div className={cx("image")}>
            <img className={cx('item')} src={images.yaml} alt=""/>
            <img className={cx('item')} src={images.env} alt=""/>
          </div>
          <div className={cx("image")}>
            <img className={cx('item')} src={images.redis} alt=""/>
          </div>
          <div className={cx("image")}>
            <img className={cx('item')} src={images.els} alt=""/>
          </div>
        </div>
      </div>
      <div className={cx("slides")}></div>
      <div className={cx('login')}>
        <div className={cx('login-title')}>
          <Form.Label as='b'>Đăng nhập</Form.Label>
        </div>
        <Form className={cx('login-form')}>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label as='i'>Tên đăng nhập*</Form.Label>
            <Form.Control className={cx("login-input")} type="text" placeholder="" autoComplete="false"/>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label as='i'>Mật khẩu*</Form.Label>
            <Form.Control className={cx("login-input")} type="password" placeholder="" autoComplete="false"/>
          </Form.Group>
        </Form>
        <div className={cx('login-button')}>
          <button className={cx('login-submit')} type="submit">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default USMLogin