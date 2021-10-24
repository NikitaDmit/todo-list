import {combineReducers, configureStore} from '@reduxjs/toolkit'
import projects from './projects/projectsReducer'
import todo from './todoProject/todoReducer'
import auth from './auth/authReducer'

const rootReducer = combineReducers({
    projects, auth, todo
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})

export type RootStore = ReturnType<typeof store.getState>
