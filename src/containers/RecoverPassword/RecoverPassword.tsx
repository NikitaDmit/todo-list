import * as React from 'react'
import {Form, Input, Button, Layout, Typography} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {useState} from 'react'
import {useDispatch} from "react-redux"
import {resetPassword} from '../../store/auth/authActions'
import {useHistory} from "react-router-dom"
import {UserOutlined} from '@ant-design/icons'

const {Title} = Typography

interface Props {
}

export const RecoverPassword: React.FC<Props> = (props: Props) => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const router = useHistory()

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
                <Title level={4}>Отправить письмо для сброса</Title>
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

                {error &&
                <div role="alert" className="ant-form-item-explain-error error">
                    {error}
                </div>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Отправить
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

RecoverPassword.defaultProps = {}

