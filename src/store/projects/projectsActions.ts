import {createAsyncThunk} from '@reduxjs/toolkit'
import {dataBase} from '../../firebase/firebase'
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from 'firebase/firestore'
import {IProject} from '../../models/IProject'
import {resetTodo, setActiveProject} from '../todoProject/todoReducer'
import {ITodo} from '../../models/ITodo'

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (projectName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            const state: any = getState(), userId = state.auth.user?.id
            if (userId) {
                const project: IProject = {projectName, todosList: [], id: '', userId}
                const docRef = await addDoc(collection(dataBase, 'projects'), project)
                project.id = docRef.id
                const {addProject} = require('./projectsReducer')
                dispatch(addProject(project))
                dispatch(setActiveProject(project))
                await updateDoc(doc(dataBase, 'projects', docRef.id), {...project})
            }
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const getProjects = createAsyncThunk(
    'projects/getProjects',
    async (_, {rejectWithValue, dispatch, getState}) => {
        try {
            const state: any = getState(), userId = state.auth.user?.id
            if (userId) {
                const docRef = query(collection(dataBase, 'projects'), where('userId', '==', userId))
                const docSnap = await getDocs(docRef)
                const projects: IProject[] = []
                docSnap.forEach((doc) => {
                    const project = doc.data()
                    project.todosList = project.todosList.map((todo: ITodo) => todo)
                    projects.push(project as IProject)
                })
                const {setProjects} = require('./projectsReducer')
                dispatch(setProjects(projects))
            }
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProjects',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            await deleteDoc(doc(dataBase, 'projects', id))
            dispatch(resetTodo())
            const {removeProject} = require('./projectsReducer')
            dispatch(removeProject(id))
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

