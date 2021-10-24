import * as React from 'react'
import {Layout, Menu} from "antd"
import {useTypedSelector} from "../../common/hooks";
import {useDispatch} from "react-redux";
import {logout} from "../../store/auth/authActions";
import {LeftOutlined, DesktopOutlined} from '@ant-design/icons'
import {resetTodo} from '../../store/todoProject/todoReducer';
import {useHistory} from "react-router-dom";

interface Props {
}

export const Header: React.FC<Props> = (props: Props) => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const {activeProject} = useTypedSelector(state => state.todo)
    const dispatch = useDispatch()
    const router = useHistory()

    const onLogout = () => dispatch(logout())

    return (
        <Layout.Header>
            {!isAuth &&
            <div onClick={() => router.goBack()} className="app-logo m-auto"><DesktopOutlined/> TodoList</div>
            }
            <Menu selectedKeys={[]} theme="dark" mode="horizontal">
                {activeProject &&
                <Menu.Item key="1" onClick={() => dispatch(resetTodo())}>
                    <LeftOutlined/> Назад
                </Menu.Item>
                }
                {isAuth && <Menu.Item key="2" className={'ml-auto'} onClick={onLogout}>Выйти</Menu.Item>}
            </Menu>
        </Layout.Header>
    )
}

Header.defaultProps = {}
