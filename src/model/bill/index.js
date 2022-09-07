import Store from "../store"
import * as ROLE from '../../constants/role'
import Customer from "../customer"

function Bill (
  {
    id = 0,
    created_at = 0,
    totalPrice = 0,
    textPrice = "",
    products = {},
    productsDetail = {},
    customer = new Customer({}),
    store = new Store({}),
    seller = {
      id: 0,
      name: 0,
      role: ROLE.STAFF,
    },
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
  this.seller = seller
  this.status = status
  this.note = note
}

export default Bill