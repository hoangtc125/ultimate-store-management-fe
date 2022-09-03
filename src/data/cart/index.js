import Cart from "../../model/cart";
import moment from 'moment'

const cart = new Cart({
  created_at: moment(),
  products: {
    2: 13,
    4: 21,
    7: 5,
    8: 36,
  }
})

export default cart