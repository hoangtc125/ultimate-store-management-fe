import { AccountResponse } from "../../model/account";
import images from '../../assets/images'
import moment from 'moment';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

let accounts = []

for (let i = 0; i < 16; i++) {
  const account = new AccountResponse(
    {
      username : "string " + i,
      fullname : "string " + i,
      role : "staff",
      phone : "string " + i,
      email : "string " + i,
      ratio_salary : "string " + i,
      created_at : "string " + i,
      avatar : images.default,
      birthday : moment(moment(), dateFormatList),
      profile : "string " + i,
      hashed_password : "string " + i,
      is_disabled : "enable",
      id : i,
    }
  )
  accounts.push(account)
}

export default accounts