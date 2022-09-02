import Cart from "../../model/cart";
import moment from 'moment'

const cart = new Cart({
  created_at: moment(),
  products: {
    0: 4,
    2: 3,
    4: 1,
  }
})

export default cart