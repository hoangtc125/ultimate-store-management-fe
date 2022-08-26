import { Link, useNavigate } from "react-router-dom"
import { Space } from "antd"
import * as URL from '../../constants/url'
import * as ROLE from '../../constants/role'
import { isVisit } from "../../utils/check"
import { useEffect } from "react"

const USMHome = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isVisit([ROLE.ADMIN, ROLE.STAFF])) {
            navigate(URL.LOGIN)
        }
    })

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