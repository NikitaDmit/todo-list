import './app.scss'
import {Layout} from 'antd'
import {ProjectMenu} from './components/ProjectMenu/ProjectMenu'
import {Header} from './components/Header/Header'
import {useTypedSelector} from './common/hooks'
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from './router'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {checkForAuthorize} from './store/auth/authActions'
import {Context} from './appContext'
import BigLoader from './components/UI/BigLoader/BigLoader'
import {IntlProvider} from 'react-intl'
import {LOCALES} from './internationalization/locales'
import {messages} from './internationalization/messages'

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [locale, setLocale] = useState(LOCALES.Ru)
    const {isAuth, isLoading} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkForAuthorize())
    }, [])

    const renderPrivateSwitch = () =>
        <Switch>
            {privateRoutes.map(route => <Route {...route} key={route.path}/>)}
            <Redirect to={RouteNames.PROJECTS}/>
        </Switch>


    const renderPublicSwitch = () =>
        <Switch>
            {publicRoutes.map(route => <Route {...route} key={route.path}/>)}
            <Redirect to={RouteNames.SIGN_IN}/>
        </Switch>

    return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.Ru}>
            {isLoading && <BigLoader/>}
            <Layout className="app">
                {isAuth && <ProjectMenu collapsed={collapsed} setCollapsed={setCollapsed}/>}
                <Layout>
                    <Header locale={locale} setLocale={setLocale}/>
                    <Context.Provider value={{collapsed}}>
                        {isAuth ? renderPrivateSwitch() : renderPublicSwitch()}
                    </Context.Provider>
                </Layout>
            </Layout>
        </IntlProvider>
    )
}

export default App
