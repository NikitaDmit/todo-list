import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from "react-redux"
import {signIn} from '../../store/auth/authActions'
import {useHistory} from 'react-router-dom'
import {RouteNames} from "../../router"
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const {Title} = Typography

interface Props {
}

export const SignIn: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useHistory()

    const onFinish = () => dispatch(signIn({email: email, password}))

    return (
        <Layout.Content className="login">
            <Form
                className="login__form"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <Title level={4}>Авторизация</Title>
                <Form.Item
                    label="Почта"
                    name="username"
                    rules={[{required: true, message: 'Укажите почту!'}, {
                        type: 'email',
                        message: 'Некорректная почта!'
                    }]}
                >
                    <Input
                        value={email} onChange={e => setEmail(e.target.value)}
                        prefix={<UserOutlined/>} placeholder="Почта"/>
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Введите пароль!'}]}
                >
                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    {error}
                </div>}

                <div className={'login__password'}>
                    <Button type="link" htmlType="button" onClick={() => router.push(RouteNames.RECOVER_PASSWORD)}>
                        Забыли пароль?
                    </Button>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} className="login-form-button">
                        Войти
                    </Button>
                    <Button onClick={() => router.push(RouteNames.SIGN_UP)}>Зарегистрироваться</Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

SignIn.defaultProps = {}
