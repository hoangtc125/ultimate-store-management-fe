import { Card, Modal } from 'antd';
import images from '../../assets/images';
import { useState } from 'react';
import USMProduct from '../product/detail';
const { Meta } = Card;

const USMItemProduct = ({item, CartData, env}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
          margin: 10,
        }}
        onClick={showModal}
        cover={<img alt="example" src={item?.images[0] || images.default} />}
      >
        <Meta title={item?.name} description={item?.nickname.join(", ")} />
      </Card>
      <Modal title="Thông tin sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={"90%"} 
      >
        <USMProduct item={item} CartData={CartData}/>
      </Modal>
    </div>
  )
};

export default USMItemProduct;