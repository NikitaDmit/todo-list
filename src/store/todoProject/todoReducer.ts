import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ITodo} from "../../models/ITodo"
import {IProject} from "../../models/IProject"
import {onEditObject} from "../../common/utils"

export interface interfaceState {
    activeProject: IProject | null;
    editableTodo: ITodo | null,
    error: string | null,
    isLoading: boolean
}

const initialState: interfaceState = {
    activeProject: null,
    editableTodo: null,
    isLoading: false,
    error: null
}

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setActiveProject: (state, action: PayloadAction<IProject>) => {
            state.activeProject = action.payload
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.activeProject?.todosList.push(action.payload)
        },
        setEditableTodo: (state, action: PayloadAction<ITodo | null>) => {
            state.editableTodo = action.payload
        },
        editTodo: (state, action) => {
            const {id, completed, title, text} = action.payload
            const list: ITodo[] = state.activeProject?.todosList || []
            const todo = list.find(todo => todo.id === id)
            if (todo) {
                onEditObject(todo, 'completed', completed)
                title && onEditObject(todo, 'title', title)
                text && onEditObject(todo, 'text', text)
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const activeProject = state.activeProject as IProject,
                todoList = state.activeProject?.todosList || []
            activeProject.todosList = todoList.filter(todo => todo.id !== action.payload)
            state.activeProject = activeProject
        },
        editProject: (state, action) => {
            onEditObject(state.activeProject || {}, 'projectName', action.payload)
        },
        resetTodo: () => initialState
    },
    extraReducers: {}
})

export const {setActiveProject, setEditableTodo, editProject, resetTodo, addTodo, editTodo, deleteTodo} = slice.actions
export default slice.reducer
