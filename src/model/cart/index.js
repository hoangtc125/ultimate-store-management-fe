function Cart (
  {
    created_at,
    totalPrice,
    textPrice,
    products,
  }
) {
  this.created_at = created_at
  this.totalPrice = totalPrice
  this.textPrice = textPrice
  this.products = products
}

function CartResponse (
  {
    created_at,
    totalPrice,
    textPrice,
    products,
    is_disabled,
    id,
  }
) {
  this.created_at = created_at
  this.totalPrice = totalPrice
  this.textPrice = textPrice
  this.products = products
  this.is_disabled = is_disabled;
  this.id = id;
}

export { Cart, CartResponse} 