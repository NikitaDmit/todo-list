import {createAsyncThunk} from "@reduxjs/toolkit"
import {doc, updateDoc} from "firebase/firestore"
import {dataBase} from "../../firebase/firebase"
import {ITodo} from "../../models/ITodo"
import {generateId} from "../../common/utils";
import {addTodo, deleteTodo, editProject, editTodo} from "./todoReducer"
import {updateProjectsList} from "../projects/projectsReducer";


export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async ({title, text}: any, {rejectWithValue, dispatch, getState}) => {
        try {
            const todo: ITodo = {id: generateId(), completed: false, title, text}
            dispatch(addTodo(todo))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {todosList: project.todosList})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const editProjectAction = createAsyncThunk(
    'todo/editProjectAction',
    async (projectName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            dispatch(editProject(projectName))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {projectName})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const deleteTodoAction = createAsyncThunk(
    'todo/deleteTodoAction',
    async (id: string, {rejectWithValue, dispatch, getState}) => {
        try {
            dispatch(deleteTodo(id))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {todosList: project.todosList})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (action: any, {rejectWithValue, dispatch, getState}) => {
        try {
            dispatch(editTodo(action))
            const state: any = getState(), project = state.todo.activeProject
            await updateDoc(doc(dataBase, "projects", project?.id), {todosList: project.todosList})
            dispatch(updateProjectsList(project))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)
