function Cart (
  {
    created_at = 0,
    totalPrice = 0,
    textPrice = 0,
    products = {},
  }
) {
  this.created_at = created_at
  this.totalPrice = totalPrice
  this.textPrice = textPrice
  this.products = products
}

export default Cart