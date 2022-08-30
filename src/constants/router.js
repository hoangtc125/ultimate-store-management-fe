import * as URL from './url'
import * as ROLE from './role'
import DefaultLayout from '../Layouts/DefaultLayout'
import ErrorLayout from '../Layouts/ErrorLayout'
import LoginLayout from '../Layouts/LoginLayout'
import USMLogin from '../components/auth/login'
import USMError from '../components/error'
import USMHome from '../components/home'
import USMCamera from '../components/camera'
import USMListAccount from '../components/account/list'
import USMListProduct from '../components/product/list'

function Mapping(url, element) {
    return {
        url,
        element,
    }
}

export const Page = [
    Mapping(URL.LOGIN, <LoginLayout Component={<USMLogin />}/> ),
    Mapping(URL.HOME, <DefaultLayout Component={<USMHome />}/> ),
    Mapping(URL.CAMERA, <DefaultLayout Component={<USMCamera />} Role={[ROLE.ADMIN]}/> ),
    Mapping(URL.ACCOUNTS, <DefaultLayout Component={<USMListAccount />}/> ),
    Mapping(URL.PRODUCTS, <DefaultLayout Component={<USMListProduct />}/> ),
    Mapping(URL.ERROR_404, <ErrorLayout Component={<USMError />}/> ),
]