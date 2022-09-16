import { Card, Modal, Tag } from 'antd';
import images from '../../assets/images';
import { useState } from 'react';
import USMProduct from '../product/detail';
import { splitMoney } from '../../utils/money';
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
        <Meta 
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {item?.name}
                {
                  // eslint-disable-next-line
                  item?.quantity == 0 ? <Tag color='red'>Hết hàng</Tag> : <Tag color='green'>Còn hàng</Tag>
                }
              </div>
              <span>{splitMoney(item?.priceOut) + " (Còn " + item?.quantity + ")"}</span>
            </div>
          } 
          description={item?.nickname.join(", ")}
        />
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