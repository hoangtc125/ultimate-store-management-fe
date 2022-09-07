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
import USMChart from '../components/report/chart'
import USMAccountCalendar from '../components/account/calendar'
import USMCart from '../components/cart'
import USMHeaderLogin from '../Layouts/components/header/login'
import USMHeader from '../Layouts/components/header'
import USMBill from '../components/bill/list'
import USMAccountDetail from '../components/account/detail'
import USMStore from '../components/setting/store'

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
            header: USMHeaderLogin,
            component: USMLogin,
        },
    }),
    new Mapping({
        url: URL.ULTIMATE_STORE_MANAGEMENT,
        element: {
            layout: LoginLayout,
            header: USMHeaderLogin,
            component: USMLogin,
        },
    }),
    new Mapping({
        url: URL.HOME,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMHome,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.CART,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMCart,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.CAMERA,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMCamera,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.ACCOUNTS,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMListAccount,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.PRODUCTS,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMListProduct,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.BILL,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMBill,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.CHARTS,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMChart,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.ACCOUNTS_CALENDAR,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMAccountCalendar,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.ACCOUNT_DETAIL,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMAccountDetail,
            role: [ROLE.ADMIN, ROLE.STAFF],
        },
    }),
    new Mapping({
        url: URL.SETTING_STORE,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMStore,
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