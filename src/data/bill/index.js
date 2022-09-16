import Bill from "../../model/bill"
import Customer from "../../model/customer"
import store from "../store"
import * as ROLE from '../../constants/role'
import images from "../../assets/images"
import { moneyToText } from "../../utils/money"

let bills = [
  new Bill(
    {
      id: 1,
      products: {
        2: 2,
        4: 4,
        7: 7,
        8: 8,
      },
      totalPrice: 2 * 20000 + 4 * 40000 + 7 * 70000 + 8 * 80000,
      textPrice: moneyToText(2 * 20000 + 4 * 40000 + 7 * 70000 + 8 * 80000),
      customer: new Customer({
        name: "Trần Công Hoàng",
        phone: "0846303882",
        address: "Nam Định",
        pricePay: 10000000,
      }),
      store: store,
      seller: {
        id: 20194060,
        name: "Tran Cong Hoang",
        role: ROLE.STAFF,
      },
      created_at: "02/09/2022",
      status: "Đã thanh toán",
      images: [images.default, images.default, images.default]
    }
  ),
  new Bill(
    {
      id: 2,
      products: {
        12: 12,
        14: 14,
        2: 2,
        1: 1,
      },
      totalPrice: 12 * 120000 + 14 * 140000 + 2 * 20000 + 1 * 10000,
      textPrice: moneyToText(12 * 120000 + 14 * 140000 + 2 * 20000 + 1 * 10000),
      customer: new Customer({
        pricePay: 200000,
      }),
      store: store,
      seller: {
        id: 20194060,
        name: "Trần Công Hoàng",
        role: ROLE.ADMIN,
      },
      created_at: "02/09/2022",
      status: "Nợ",
      note: "Tuần sau trả",
      images: []
    }
  ),
]

export default bills