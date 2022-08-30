function Account (
  {
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
  }
) {
  this.username = username;
  this.fullname = fullname;
  this.role = role;
  this.phone = phone;
  this.email = email;
  this.ratio_salary = ratio_salary;
  this.created_at = created_at;
  this.avatar = avatar;
  this.birthday = birthday;
  this.profile = profile;
}

function AccountResponse (
  {
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
  }
) {
  this.username = username;
  this.fullname = fullname;
  this.role = role;
  this.phone = phone;
  this.email = email;
  this.ratio_salary = ratio_salary;
  this.created_at = created_at;
  this.avatar = avatar;
  this.birthday = birthday;
  this.profile = profile;
  this.hashed_password = hashed_password;
  this.is_disabled = is_disabled;
  this.id = id;
}

export { Account, AccountResponse} 