function Cart (
  {
    totalPrice = 0,
    textPrice = 0,
    products = {},
  }
) {
  this.totalPrice = totalPrice
  this.textPrice = textPrice
  this.products = products
}

export default Cart