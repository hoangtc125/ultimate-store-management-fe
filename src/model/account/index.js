const Account = (
  username,
  fullname,
  role,
  phone,
  email,
  ratio_salary,
  created_at,
  avatar,
  birthday,
  profile,
) => ({
  username,
  fullname,
  role,
  phone,
  email,
  ratio_salary,
  created_at,
  avatar,
  birthday,
  profile,
})

const AccountResponse = (
  username,
  fullname,
  role,
  phone,
  email,
  ratio_salary,
  created_at,
  avatar,
  birthday,
  profile,
  hashed_password,
  is_disabled,
  id,
) => ({
  username,
  fullname,
  role,
  phone,
  email,
  ratio_salary,
  created_at,
  avatar,
  birthday,
  profile,
  hashed_password,
  is_disabled,
  id,
})

export { Account, AccountResponse} 