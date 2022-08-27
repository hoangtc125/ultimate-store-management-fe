import { Card } from 'antd';
import images from '../../assets/images';
const { Meta } = Card;

const USMItemProduct = ({title, description}) => (
  <Card
    hoverable
    style={{
      width: 240,
      margin: 10,
    }}
    cover={<img alt="example" src={images.default} />}
  >
    <Meta title={title} description={description} />
  </Card>
);

export default USMItemProduct;