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
        url: URL.HOME,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMHome,
        },
    }),
    new Mapping({
        url: URL.CART,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMCart,
        },
    }),
    new Mapping({
        url: URL.CAMERA,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMCamera,
            role: [ROLE.ADMIN],
        },
    }),
    new Mapping({
        url: URL.ACCOUNTS,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMListAccount,
        },
    }),
    new Mapping({
        url: URL.PRODUCTS,
        element: {
            layout: DefaultLayout,
            header: USMHeader,
            component: USMListProduct,
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