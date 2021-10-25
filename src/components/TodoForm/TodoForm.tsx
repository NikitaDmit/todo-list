import * as React from 'react'
import {useEffect, useState} from 'react'
import {Form, Card, Checkbox} from 'antd'
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import {useTypedSelector} from '../../common/hooks'
import {FormattedMessage, useIntl} from 'react-intl'

interface Props {
    onApply: (title: string, text: string, completed: boolean) => void,
    onCloseForm: () => void
}

export const TodoForm: React.FC<Props> = (props: Props) => {
    const {activeProject, editableTodo} = useTypedSelector(state => state.todo)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const intl = useIntl()

    useEffect(() => {
        resetInputs()
    }, [activeProject])

    useEffect(() => {
        if (editableTodo) {
            setTitle(editableTodo.title)
            setText(editableTodo.text)
            setCompleted(editableTodo.completed)
        }
    }, [editableTodo])

    const onCreateTodo = () => {
        if (title.trim()) {
            props.onApply(title, text, completed)
            resetInputs()
        }
    }

    const resetInputs = () => {
        !title.trim() && setTitle('')
        !text.trim() && setText('')
        completed && setCompleted(false)
    }

    return (
        <div className={'todo__form w-100'}>
            <Card
                actions={[
                    <CheckOutlined className={'icon icon_apply'} onClick={onCreateTodo}/>,
                    <CloseOutlined className={'icon icon_danger'} onClick={props.onCloseForm}/>
                ]}
            >
                <Form>
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: intl.formatMessage({id: 'todoForm.inputTitleReq'})}]}
                    >
                        <div className="ant-form-item-control-input-content">
                            <input type={'text'} className="ant-input"
                                   placeholder={intl.formatMessage({id: 'todoForm.inputTitle'})} value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                        </div>
                    </Form.Item>
                    <Form.Item name="text">
                        <div className="ant-form-item-control-input-content">
                            <textarea className="ant-input" cols={3}
                                      placeholder={intl.formatMessage({id: 'todoForm.descriptionTask'})}
                                      value={text} onChange={e => setText(e.target.value)}/>
                        </div>
                    </Form.Item>
                    {
                        editableTodo &&
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        >
                            <FormattedMessage id='todoForm.done'/>
                        </Checkbox>
                    }
                </Form>
            </Card>
        </div>
    )
}

TodoForm.defaultProps = {
    onApply: () => null,
    onCloseForm: () => null
}
