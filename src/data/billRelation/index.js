import { BillRelation } from "../../model/billRelation"

const billRelation = [
  new BillRelation({
    id: 1,
    childs: [
      {
        id: 3,
        created_at: "04/09/2022",
        status: "refund",
      },
      {
        id: 4,
        created_at: "09/09/2022",
        status: "refund",
      },
    ]
  }),
  new BillRelation({
    id: 2,
    childs: [
      {
        id: 5,
        created_at: "11/09/2022",
        status: "refund",
      },
      {
        id: 6,
        created_at: "17/09/2022",
        status: "pay1",
      },
    ]
  }),
]

export default billRelation