import { AccountResponse } from "../../model/account";
import * as ROLE from '../../constants/role'
import images from '../../assets/images'

let accounts = []

for (let i = 0; i < 16; i++) {
  const account = new AccountResponse(
    {
      username : "string " + i,
      fullname : "string " + i,
      role : ROLE.STAFF,
      phone : "string " + i,
      email : "string " + i,
      ratio_salary : "string " + i,
      created_at : "string " + i,
      avatar : images.default,
      birthday : '12/05/2001',
      profile : "string " + i,
      hashed_password : "string " + i,
      is_disabled : false,
      id : i,
    }
  )
  accounts.push(account)
}

export default accounts