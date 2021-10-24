import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {signUp} from '../../store/auth/authActions'
import {useHistory} from 'react-router-dom'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {FormattedMessage, useIntl} from 'react-intl'

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
    const intl = useIntl()

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
                    label={intl.formatMessage({id: 'input.email'})}
                    name="email"
                    rules={[{required: true, message: 'input.emailReq'}, {
                        type: 'email',
                        message: intl.formatMessage({id: 'input.emailError'})
                    }]}
                >
                    <Input
                        prefix={<UserOutlined/>} placeholder={intl.formatMessage({id: 'input.email'})}
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={intl.formatMessage({id: 'input.password'})}
                    name="password"
                    rules={[
                        {required: true, message: intl.formatMessage({id: 'input.passwordReq'})},
                        () => ({
                            validator(_, value) {
                                if (value.length > 6) return Promise.resolve()
                                setValid(false)
                                return Promise.reject(new Error(intl.formatMessage({id: 'input.passwordError'})))
                            }
                        })
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder={intl.formatMessage({id: 'input.password'})}
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label={intl.formatMessage({id: 'input.dupPassword'})}
                    name="password2"
                    rules={[{required: true, message: intl.formatMessage({id: 'input.dupPasswordError'})}]}
                    validateStatus={isValid ? '' : 'error'}
                    help={isValid ? ' ' : intl.formatMessage({id: 'input.dupPasswordError'})}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        type="password2"
                        placeholder={intl.formatMessage({id: 'input.dupPassword'})}
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}/>
                </Form.Item>

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    <FormattedMessage id={error}/>
                </div>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={!isValid || isInit}>
                        <FormattedMessage id={'button.signUp'}/>
                    </Button>
                    <Button htmlType="button"
                            onClick={() => router.goBack()}>
                        <FormattedMessage id={'button.back'}/>
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

SignUp.defaultProps = {}
