import products from '../data/product'

const getProducts = (cart) => {
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

export {  getProducts }