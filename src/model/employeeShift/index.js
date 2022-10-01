function EmployeeShift (
  {
    id="",
    account_id="",
    shifts = {
      "t1": [],
      "t2": [],
      "t3": [],
      "t4": [],
      "t5": [],
      "t6": [],
      "t7": [],
    },
    is_disabled=false
  }
) {
  this.id = id
  this.account_id = account_id
  this.shifts = shifts
  this.is_disabled = is_disabled
}

export default EmployeeShift