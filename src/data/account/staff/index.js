import images from '../../../assets/images'
import * as ROLE from '../../../constants/role'
import { AccountResponse } from '../../../model/account'

const staff = new AccountResponse(
  {
    username : "staff",
    fullname : "Tran Cong Hoang",
    role : ROLE.STAFF,
    phone : "0846303882",
    email : "trconghoangg@gmail.com",
    ratio_salary : "2",
    created_at : "string",
    avatar : images.default,
    birthday : '12/05/2001',
    profile : "string",
    hashed_password : "staff",
    is_disabled : false,
    id : "20194060",
  }
)

export default staff