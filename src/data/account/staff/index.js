import images from '../../../assets/images'
import { AccountResponse } from '../../../model/account'

const staff = new AccountResponse(
  {
    username : "staff",
    fullname : "Tran Cong Hoang",
    role : "staff",
    phone : "0846303882",
    email : "trconghoangg@gmail.com",
    ratio_salary : "2",
    created_at : "string",
    avatar : images.logo,
    birthday : '12/05/2001',
    profile : "string",
    hashed_password : "staff",
    is_disabled : "enable",
    id : 20194060,
  }
)

export default staff