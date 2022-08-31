import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { BackTop } from 'antd'

const cx = classNames.bind(styles)
const USMBody = ({ Component }) => {
    return (
        <div className={cx('wrapper')}>
            {Component}
            <>
                <BackTop />
            </>
        </div>
    )
}

export default USMBody