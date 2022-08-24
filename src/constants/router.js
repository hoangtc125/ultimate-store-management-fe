import * as URL from './url'
import DefaultLayout from '../Layouts/DefaultLayout'
import ErrorLayout from '../Layouts/ErrorLayout'
import LoginLayout from '../Layouts/LoginLayout'
import USMLogin from '../components/auth/login'
import USMError from '../components/error'
import USMHome from '../components/home'
import USMCamera from '../components/camera'

function Mapping(url, element) {
    return {
        url,
        element
    }
}

export const Page = [
    Mapping(URL.LOGIN, < LoginLayout Component={<USMLogin />}/> ),
    Mapping(URL.HOME, < DefaultLayout Component={<USMHome />}/> ),
    Mapping(URL.CAMERA, < DefaultLayout Component={<USMCamera />}/> ),
    Mapping(URL.ERROR_404, < ErrorLayout Component={<USMError />}/> ),
]