import products from '../data/product'
import * as MODE from '../constants/mode'
import { isMode } from './check'

const getProducts = (cart) => {
  if(isMode([MODE.TEST])) {
    if (!cart?.products) {
      return 
    }
    const productIDs = Object.keys(cart.products)
    const res = productIDs.map(productID => {
      return products.filter(
        // eslint-disable-next-line
        element => element.id == productID
      )[0]
    })
    return res
  }
}

export { getProducts }