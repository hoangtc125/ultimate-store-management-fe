import { ProductResponse } from "../../model/product";
import images from '../../assets/images'

let products = []

for (let i = 0; i < 16; i++) {
  const product = new ProductResponse(
    {
      name: "product " + i,
      nickname: ["name " + i, "name " + i, "name " + i,],
      priceIn: i * 10000,
      brand: "brand " + i,
      quantity: i,
      priceOut: i * 10000,
      images: [images.default, images.logo, images.logolong, images.ipstart, images.ipcamera, images.ipconnect],
      is_disabled: "enable",
      id: i,
    }
  )
  products.push(product)
}

export default products