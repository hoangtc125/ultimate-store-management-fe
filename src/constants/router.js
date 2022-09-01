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
import USMProduct from '../components/product/detail'
import USMChart from '../components/report/chart'
import USMAccountCalendar from '../components/account/calendar'

function Mapping (
    {
      url,
      element,
    }
) {
    this.url = url
    this.element = element
}

export const Page = [
    new Mapping({
        url: URL.LOGIN,
        element: {
            layout: LoginLayout,
            component: USMLogin,
        },
    }),
    new Mapping({
        url: URL.HOME,
        element: {
            layout: DefaultLayout,
            component: USMHome
        },
    }),
    new Mapping({
        url: URL.CAMERA,
        element: {
            layout: DefaultLayout,
            component: USMCamera,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.ACCOUNTS,
        element: {
            layout: DefaultLayout,
            component: USMListAccount,
        },
    }),
    new Mapping({
        url: URL.PRODUCTS,
        element: {
            layout: DefaultLayout,
            component: USMListProduct,
        },
    }),
    new Mapping({
        url: URL.PRODUCT,
        element: {
            layout: DefaultLayout,
            component: USMProduct,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.CHARTS,
        element: {
            layout: DefaultLayout,
            component: USMChart,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.ACCOUNTS_CALENDAR,
        element: {
            layout: DefaultLayout,
            component: USMAccountCalendar,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.ERROR_404,
        element: {
            layout: ErrorLayout,
            component: USMError,
        },
    }),
]

// function Mapping(url, element) {
//     return {
//         url,
//         element,
//     }
// }

// export const Page = [
//     Mapping(URL.LOGIN, <LoginLayout Component={<USMLogin />}/> ),
//     Mapping(URL.HOME, <DefaultLayout Component={<USMHome />}/> ),
//     Mapping(URL.CAMERA, <DefaultLayout Component={<USMCamera />} Role={[ROLE.ADMIN]}/> ),
//     Mapping(URL.ACCOUNTS, <DefaultLayout Component={<USMListAccount />}/> ),
//     Mapping(URL.PRODUCTS, <DefaultLayout Component={<USMListProduct />}/> ),
//     Mapping(URL.PRODUCT, <DefaultLayout Component={<USMProduct />} Role={[ROLE.ADMIN]}/> ), 
//     Mapping(URL.CHARTS, <DefaultLayout Component={<USMChart />} Role={[ROLE.ADMIN]}/> ), 
//     Mapping(URL.ACCOUNTS_CALENDAR, <DefaultLayout Component={<USMAccountCalendar />} Role={[ROLE.ADMIN]}/> ), 
//     Mapping(URL.ERROR_404, <ErrorLayout Component={<USMError />}/> ),
// ]