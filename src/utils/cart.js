import products from '../data/product'
import * as MODE from '../constants/mode'
import * as API from '../constants/api'
import openNotificationWithIcon from './notification'
import { isMode } from './check'
import { ProductResponse } from '../model/product'

const getProducts = async (cart, env) => {
  if (!cart?.products) {
    return 
  }
  const productIDs = Object.keys(cart.products)
  if(isMode([MODE.TEST])) {
    const res = productIDs.map(productID => {
      return products.filter(
        // eslint-disable-next-line
        element => element.id == productID
      )[0]
    })
    return res
  }
  const response = await fetch(API.DOMAIN + env.REACT_APP_BACKEND_PORT + API.GET_ALL_MIN, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  })
	const data = await response.json();
  // eslint-disable-next-line
  if(data?.status_code != 200) {
    openNotificationWithIcon(
      'error',
      'Cập nhật không thành công',
      data?.msg,
    )
    return []
  } else {
    const vals = data?.data.map(element => {
      const newProductResponse = new ProductResponse({
        ...element, key: element.id, id: element.id,
      })
      return newProductResponse
    })
    return productIDs.map(productID => {
      return vals.filter(
        // eslint-disable-next-line
        element => element.id == productID
      )[0]
    })
  }
}

export { getProducts }