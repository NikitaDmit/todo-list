import * as React from 'react'
import {useState} from 'react'
import {Button, Card, Form, Input} from 'antd'
import {PlusOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {createProject} from '../../store/projects/projectsActions'
import classNames from 'classnames'
import {FormattedMessage, useIntl} from 'react-intl'

interface Props {
}

export const CreateProject: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch()
    const intl = useIntl()
    const [formIsShow, showOrHideForm] = useState(false)
    const [name, setName] = useState('')
    const [isValid, setValid] = useState(false)
    const classes = classNames('icon', isValid ? 'icon_apply' : 'icon_disabled')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setValid(!!value)
        setName(value)
    }

    const onCreateProject = () => {
        if (isValid) {
            dispatch(createProject(name))
            setValid(false)
            setName('')
            showOrHideForm(false)
        }
    }

    return (
        <React.Fragment>
            {
                formIsShow ?
                    <Form>
                        <Card actions={[
                            <CheckOutlined className={classes} onClick={onCreateProject}/>,
                            <CloseOutlined className={'icon icon_danger'} onClick={() => showOrHideForm(false)}/>
                        ]}>

                            <Form.Item
                                name="title"
                                rules={[{
                                    required: true,
                                    message: intl.formatMessage({id: 'project.projectNameReq'})
                                }]}
                            >
                                <Input placeholder={intl.formatMessage({id: 'createProject.projectName'})}
                                       value={name}
                                       onChange={onChange}/>
                            </Form.Item>
                        </Card>
                    </Form>
                    :
                    <Button type="dashed" block icon={<PlusOutlined/>} onClick={() => showOrHideForm(true)}>
                        <FormattedMessage id='createProject.create'/>
                    </Button>
            }
        </React.Fragment>
    )
}

CreateProject.defaultProps = {}
