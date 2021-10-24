import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {resetPassword} from '../../store/auth/authActions'
import {useHistory} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons'
import {FormattedMessage, useIntl} from 'react-intl'

const {Title} = Typography

interface Props {
}

export const RecoverPassword: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const router = useHistory()
    const intl = useIntl()

    const onFinish = () => {
        dispatch(resetPassword(email))
        router.goBack()
    }


    return (
        <Layout.Content className="login">
            <Form
                className={'login__form'}
                onFinish={onFinish}
                layout={'vertical'}
            >
                <Title level={4}><FormattedMessage id='recover.sendLetter'/></Title>
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

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    <FormattedMessage id={error}/>
                </div>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        <FormattedMessage id={'button.toSend'}/>
                    </Button>
                    <Button htmlType="button" onClick={() => router.goBack()}>
                        <FormattedMessage id={'button.signUp'}/>
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

RecoverPassword.defaultProps = {}

