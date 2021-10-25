import * as React from 'react'
import {TodoForm} from "../TodoForm/TodoForm"
import {useEffect, useState} from "react"
import {useTypedSelector} from "../../common/hooks"
import {Button, Dropdown, Form, Input, Menu, Typography} from 'antd'
import {PlusOutlined, EditOutlined, CheckOutlined, CloseOutlined, EllipsisOutlined} from '@ant-design/icons'
import {TodoList} from "../TodoList/TodoList"
import './Project.scss'
import {useDispatch} from "react-redux";
import {deleteProject} from "../../store/projects/projectsActions"
import {createTodo, editProjectAction} from '../../store/todoProject/todoActions\''
import {FormattedMessage, useIntl} from 'react-intl'

const {Title} = Typography

interface Props {
}

export const Project: React.FC<Props> = (props: Props) => {
    const [formIsShow, showOrHideForm] = useState(false)
    const [formIsEdit, setEditForm] = useState(false)
    const {editableTodo, activeProject} = useTypedSelector(state => state.todo)
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const intl = useIntl()

    useEffect(() => {
        const projectName = activeProject?.projectName || ''
        name !== projectName && setName(projectName)
    }, [activeProject])

    useEffect(() => {
        formIsShow && showOrHideForm(false)
    }, [activeProject, editableTodo])

    const onApply = () => {
        if (name.trim()) {
            dispatch(editProjectAction(name))
            setEditForm(false)
        }
    }

    const onCloseForm = () => showOrHideForm(false)

    const onApplyTodo = (title: string, text: string, completed: boolean) => {
        dispatch(createTodo({title, text, completed}))
    }

    const renderMenu = () =>
        <Menu>
            <Menu.Item key="1" onClick={() => setEditForm(true)}>
                <EditOutlined className={'icon'}/> <FormattedMessage id='button.edit'/>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => dispatch(deleteProject(activeProject?.id || ''))}>
                <CloseOutlined className={'icon'}/> <FormattedMessage id='button.delete'/>
            </Menu.Item>
        </Menu>

    return (
        <div className={'project'}>
            {
                formIsEdit
                    ? <Form>
                        <Form.Item
                            className={'project__form'}
                            rules={[{required: true, message: intl.formatMessage({id: 'project.projectNameReq'})}]}
                        >
                            <Input value={name} onChange={e => setName(e.target.value)}/>
                            <div className={'project__form-buttons'}>
                                <CheckOutlined className={'icon icon_apply'} onClick={onApply}/>
                                <CloseOutlined className={'icon icon_danger'} onClick={() => setEditForm(false)}/>
                            </div>
                        </Form.Item>
                    </Form>
                    :
                    <div className={'project__edit'}>
                        <Title level={3}>{activeProject?.projectName}</Title>
                        <Dropdown overlay={renderMenu}>
                            <EllipsisOutlined className={'icon'}/>
                        </Dropdown>
                    </div>
            }
            {
                !formIsShow && !editableTodo &&
                <Button type="dashed" block icon={<PlusOutlined/>} onClick={() => showOrHideForm(true)}>
                     <FormattedMessage id='project.addTask'/>
                </Button>
            }
            {
                formIsShow &&
                <TodoForm onCloseForm={onCloseForm} onApply={onApplyTodo}/>
            }
            <TodoList/>
        </div>
    )
}

Project.defaultProps = {}
