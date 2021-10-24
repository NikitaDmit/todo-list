import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {signIn} from '../../store/auth/authActions'
import {useHistory} from 'react-router-dom'
import {RouteNames} from '../../router'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {FormattedMessage, useIntl} from 'react-intl'

const {Title} = Typography

interface Props {
}

export const SignIn: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useHistory()
    const intl = useIntl()

    const onFinish = () => dispatch(signIn({email: email, password}))

    return (
        <Layout.Content className="login">
            <Form
                className="login__form"
                onFinish={onFinish}
                layout={'vertical'}
            >
                <Title level={4}> <FormattedMessage id={'signIn.auth'}/></Title>
                <Form.Item
                    label={intl.formatMessage({id: 'input.email'})}
                    name="email"
                    rules={[{required: true, message: 'input.emailReq'}, {
                        type: 'email',
                        message: intl.formatMessage({id: 'input.emailError'})
                    }]}
                >
                    <Input
                        value={email} onChange={e => setEmail(e.target.value)}
                        prefix={<UserOutlined/>} placeholder={intl.formatMessage({id: 'input.email'})}/>
                </Form.Item>
                <Form.Item
                    label={intl.formatMessage({id: 'input.password'})}
                    name="password"
                    rules={[{required: true, message: intl.formatMessage({id: 'input.passwordReq'})}]}
                >
                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder={intl.formatMessage({id: 'input.password'})}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    <FormattedMessage id={error}/>
                </div>}

                <div className={'login__password'}>
                    <Button type="link" htmlType="button" onClick={() => router.push(RouteNames.RECOVER_PASSWORD)}>
                        <FormattedMessage id={'signIn.recover'}/>
                    </Button>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} className="login-form-button">
                        <FormattedMessage id={'button.login'}/>
                    </Button>
                    <Button onClick={() => router.push(RouteNames.SIGN_UP)}>
                        <FormattedMessage id={'button.signUp'}/>
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

SignIn.defaultProps = {}
