import { ProductResponse } from "../../model/product";
import images from '../../assets/images'

let products = []

for (let i = 0; i < 16; i++) {
  const product = new ProductResponse(
    {
      name: "product " + i,
      nickname: ["name 0", "name 1", "name 2",],
      priceIn: i * 10000,
      brand: "brand " + i,
      quantity: i,
      priceOut: i * 10000,
      images: [images.default, images.default, images.default, images.default, images.default, images.default],
      is_disabled: false,
      id: i,
    }
  )
  products.push(product)
}

export default products