import Shift from "../../model/shift"

const shifts = [
  new Shift({
    id: 0,
    name: "Ca sáng",
    start: "07:00:00",
    end: "11:00:00",
    is_disabled: false
  }),
  new Shift({
    id: 1,
    name: "Ca trưa",
    start: "11:00:00",
    end: "15:00:00",
    is_disabled: false
  }),
  new Shift({
    id: 2,
    name: "Ca chiều",
    start: "15:00:00",
    end: "19:00:00",
    is_disabled: false
  }),
  new Shift({
    id: 3,
    name: "Ca tối",
    start: "19:00:00",
    end: "23:00:00",
    is_disabled: false
  }),
  new Shift({
    id: 4,
    name: "Ca chiều",
    start: "13:00:00",
    end: "17:00:00",
    is_disabled: true
  }),
  new Shift({
    id: 5,
    name: "Ca tối",
    start: "18:00:00",
    end: "22:00:00",
    is_disabled: true
  }),
]

export default shifts