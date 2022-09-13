import USMENV from '../utils/env'

export const DOMAIN = async () => {
  const env = await USMENV()
  return env.REACT_APP_API_PROTOCAL + '://' + window.location.hostname + ':' + env.REACT_APP_BACKEND_PORT
}
export const LOGIN = '/account/login'
export const ABOUT_ME = '/account/me'
export const ACCOUNT_UPDATE = '/account/update?account_id='
export const ACCOUNTS = '/account/get-all'
export const ACCOUNTS_AVAILABLE = '/account/get-all-active'
export const ACCOUNT_DISABLE = '/account/disable?account_id='
export const ACCOUNT_UNDISABLED = '/account/undisabled?account_id='
export const ACCOUNT_CREATE = '/account/register'
export const ACCOUNT_UPDATE_PASSWORD =  '/account/update-password'
export const ACCOUNT_UPDATE_PASSWORD_STAFF = '/account/update-password-staff?account_id='
export const STAFF_UPDATE = '/account/update-staff?account_id='
export const PRODUCT_CREATE = '/product/create'
export const PRODUCT_UPDATE = '/product/update?product_id='
export const PRODUCT_DISABLE = '/product/disable?product_id='
export const PRODUCT_UNDISABLED = '/product/undisabled?product_id='
export const PRODUCT_GET = '/product/get?product_id='
export const PRODUCT_GET_ALL = '/product/get-all'
export const PRODUCT_GET_ALL_ACTIVATE = '/product/get-all-active'
export const GET_ALL_MIN = '/product/get-all-min'