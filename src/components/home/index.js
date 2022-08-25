import { Link } from "react-router-dom"
import { Space } from "antd"

const USMHome = () => {
    return (
        <>
            <Space>
                <h1>USMHome</h1>
                <Link to='/camera'>camera</Link>
                <Link to='/error'>error</Link>
            </Space>
        </>
    )
}

export default USMHome