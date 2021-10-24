import * as React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {List, Checkbox, Menu, Dropdown} from 'antd';
import {EditOutlined, EllipsisOutlined, CloseOutlined} from '@ant-design/icons';
import {ITodo} from "../../models/ITodo";
import {setEditableTodo} from '../../store/todoProject/todoReducer';
import {deleteTodoAction, updateTodo} from '../../store/todoProject/todoActions\'';
import {TodoForm} from '../TodoForm/TodoForm';
import {useTypedSelector} from "../../common/hooks";

interface Props {
}

export const TodoList: React.FC = (props: Props) => {
    const {activeProject, editableTodo} = useTypedSelector((state) => state.todo)
    const dispatch = useDispatch()

    const onChange = (id: string) => (e: any) =>
        dispatch(updateTodo({id, completed: e.target.checked, title: null, text: null}))

    const onCloseForm = () => dispatch(setEditableTodo(null))

    const onApplyTodo = (id: string) => (title: string, text: string, completed: boolean) => {
        dispatch(updateTodo({id, completed, title, text}))
        dispatch(setEditableTodo(null))
    }

    const renderMenu = (todo: ITodo) =>
        <Menu>
            <Menu.Item key="1" onClick={() => dispatch(setEditableTodo(todo))}>
                <EditOutlined className={'icon'}/> Редактировать
            </Menu.Item>
            <Menu.Item key="2" onClick={() => dispatch(deleteTodoAction(todo.id))}>
                <CloseOutlined className={'icon'}/> Удалить
            </Menu.Item>
        </Menu>

    return (
        <div className={'todo__list'}>
            <List
                dataSource={activeProject?.todosList || []}
                renderItem={(todo: ITodo) =>
                    <List.Item
                        key={todo.id}
                        actions={!editableTodo ? [
                            <Dropdown overlay={() => renderMenu(todo)}>
                                <EllipsisOutlined className={'icon'}/>
                            </Dropdown>
                        ] : []}>
                        {
                            editableTodo === todo
                                ? <TodoForm
                                    onCloseForm={onCloseForm} onApply={onApplyTodo(todo.id)}
                                />
                                : <List.Item.Meta
                                    avatar={<Checkbox name={'completed'} checked={todo.completed}
                                                      onChange={onChange(todo.id)}/>}
                                    title={todo.title}
                                    description={todo.text}
                                />
                        }
                    </List.Item>
                }
            >
            </List>
        </div>
    )
}

TodoList.defaultProps = {}

