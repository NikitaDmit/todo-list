import {SignIn} from "../containers/SignIn/SignIn"
import {ProjectsController} from "../containers/ProjectsController/ProjectsController"
import {SignUp} from "../containers/SignUp/SignUp"
import {IRoute} from "../models/IRoute"
import { RecoverPassword } from "../containers/RecoverPassword/RecoverPassword"

export enum RouteNames {
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    RECOVER_PASSWORD = '/recover-password',
    PROJECTS = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.SIGN_IN, exact: true, component: SignIn},
    {path: RouteNames.SIGN_UP, exact: true, component: SignUp},
    {path: RouteNames.RECOVER_PASSWORD, exact: true, component: RecoverPassword}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROJECTS, exact: true, component: ProjectsController}
]
