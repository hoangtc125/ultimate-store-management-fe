import { Typography } from "antd"
import { useEffect, useState } from "react"
import { genarateBreadcrumb } from '../../../utils/breadcrumb'
import moment from 'moment'
const { Text } = Typography

const USMBreadcrumb = () => {
  const [time, setTime] = useState()

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime('Thứ ' + (parseInt(moment().format('d')) + 1) + ' - Tuần ' + moment().format('w') + ' - Ngày ' +  moment().format('DD/MM/YYYY') + ' - Giờ ' + moment().format('HH:mm:ss'))
    }, 1000);

    return () => {
      clearInterval(timeInterval)
    }
  })

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {genarateBreadcrumb(window.location.pathname)}
      <div><Text code>{time}</Text></div>
    </div>
  )
}

export default USMBreadcrumb