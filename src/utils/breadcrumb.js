import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

export const genarateBreadcrumb = (Location) => {
  let a = Location
  let b = Location.split('/')
  let c = []
  for (let i = 1; i < b.length; i++) {
    c.push([b[i], a.split('/'+b[i])[0] + '/' + b[i]])
  }
  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      {c.map((element, id) => {
        return <Breadcrumb.Item key={id}><Link to={element[1]}>{element[0]}</Link></Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
}