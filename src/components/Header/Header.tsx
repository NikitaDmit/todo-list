import * as React from 'react'
import {Layout, Menu} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/auth/authActions'
import {LeftOutlined, DesktopOutlined} from '@ant-design/icons'
import {resetTodo} from '../../store/todoProject/todoReducer'
import {useHistory} from 'react-router-dom'
import {LOCALES} from '../../internationalization/locales'
import './Header.scss'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

interface Props {
    locale: string,
    setLocale: React.Dispatch<React.SetStateAction<string>>
}

export const Header: React.FC<Props> = ({locale, setLocale}: Props) => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const {activeProject} = useTypedSelector(state => state.todo)
    const dispatch = useDispatch()
    const router = useHistory()

    const onLogout = () => dispatch(logout())

    const getClassNames = (item: string) =>
        classNames('lang-switcher__item', item === locale ? 'lang-switcher__item_active' : '')

    return (
        <Layout.Header className={'header'}>
            {!isAuth &&
            <div onClick={() => router.goBack()} className="header__logo"><DesktopOutlined/> TodoList</div>
            }
            <Menu selectedKeys={[]} theme="dark" mode="horizontal" className={'header__menu'}>
                {activeProject &&
                <Menu.Item key="1" onClick={() => dispatch(resetTodo())}>
                    <LeftOutlined/> <FormattedMessage id='button.back'/>
                </Menu.Item>
                }
                {isAuth &&
                <Menu.Item key="2" className={'ml-auto'} onClick={onLogout}>
                    <FormattedMessage id='header.logout'/>
                </Menu.Item>}
                <Menu.Item key={3} className={'lang-switcher'}>
                    <div className={'lang-switcher__menu'}>
                        {Object.keys(LOCALES).map(item =>
                            <div
                                onClick={() => setLocale(item)}
                                className={getClassNames(item)}
                                key={item}>
                                {item}
                            </div>)}
                    </div>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    )
}

Header.defaultProps = {
    locale: 'Ru',
    setLocale: () => null
}
