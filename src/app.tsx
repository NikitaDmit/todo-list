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

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
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
        <>
            {isLoading && <BigLoader/>}
            <Layout className="app">
                {isAuth && <ProjectMenu collapsed={collapsed} setCollapsed={setCollapsed}/>}
                <Layout>
                    <Header/>
                    <Context.Provider value={{collapsed}}>
                        {isAuth ? renderPrivateSwitch() : renderPublicSwitch()}
                    </Context.Provider>
                </Layout>
            </Layout>
        </>
    )
}

export default App
