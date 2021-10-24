import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from "react-redux"
import {signUp} from '../../store/auth/authActions'
import {useHistory} from "react-router-dom"
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const {Title} = Typography

interface Props {
}

export const SignUp: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isValid, setValid] = useState(true)
    const router = useHistory()
    const isInit = isValid && !email && !password && !password2

    const onFinish = () => dispatch(signUp({email: email, password}))

    return (
        <Layout.Content className="login">
            <Form
                className={'login__form'}
                onFinish={onFinish}
                layout={'vertical'}
                onValuesChange={(changedValues, allValues) => setValid(allValues.password === allValues.password2)}
            >
                <Title level={4}>Регистрация</Title>
                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[{required: true, message: 'Укажите почту!'}, {
                        type: 'email',
                        message: 'Некорректная почта!'
                    }]}
                >
                    <Input
                        prefix={<UserOutlined/>} placeholder="Почта"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {required: true, message: 'Введите пароль!'},
                        () => ({
                            validator(_, value) {
                                if (value.length > 6) return Promise.resolve()
                                setValid(false)
                                return Promise.reject(new Error('Пароль короче 6 символов!'));
                            },
                        })
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Поврторите пароль"
                    name="password2"
                    rules={[{required: true, message: 'Пароли не совпадают!'}]}
                    validateStatus={isValid ? '' : 'error'}
                    help={isValid ? ' ' : 'Пароли не совпадают!'}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password2"
                        placeholder="Повторите пароль"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}/>
                </Form.Item>

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    {error}
                </div>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={!isValid || isInit}>
                        Зарегистрироваться
                    </Button>
                    <Button htmlType="button"
                            onClick={() => router.goBack()}>
                        Назад
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

SignUp.defaultProps = {}
