import Store from "../store"
import Customer from "../customer"

function Bill (
  {
    id = 0,
    created_at = 0,
    totalPrice = 0,
    textPrice = "",
    products = {},
    productsDetail = {},
    customer = new Customer(),
    store = new Store(),
    status = "",
    note = "",
  }
) {
  this.id = id
  this.created_at = created_at
  this.totalPrice = totalPrice
  this.textPrice = textPrice
  this.products = products
  this.productsDetail = productsDetail
  this.customer = customer
  this.store = store
  this.status = status
  this.note = note
}

export default Bill