import styles from './index.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const USMBody = ({ Component }) => {
    return (
        <div className={cx('wrapper')}>
            {Component}
        </div>
    )
}

export default USMBody