import {createAsyncThunk} from '@reduxjs/toolkit'
import {authWithFirebase} from '../../firebase/firebase'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut, User, createUserWithEmailAndPassword, sendPasswordResetEmail
} from 'firebase/auth'
import {IUser} from '../../models/IUser'
import {resetTodo} from '../todoProject/todoReducer'
import {resetProjects} from '../projects/projectsReducer'

export const authChanged = (dispatch: any) => {
    const callback = onAuthStateChanged(authWithFirebase, (user: User | null) => {
        const {setUserData, resetAuth} = require('./authReducer')
        if (user) {
            const userData: IUser = {
                id: user.uid,
                login: user.email as string
            }
            dispatch(setUserData({userData, isAuth: true}))
        } else dispatch(resetAuth())
    })
    callback()
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({email, password}: any, {rejectWithValue, dispatch}) => {
        try {
            await signInWithEmailAndPassword(authWithFirebase, email, password)
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue('errors.signIn')
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({email, password}: any, {rejectWithValue, dispatch}) => {
        try {
            await createUserWithEmailAndPassword(authWithFirebase, email, password)
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue('errors.signUp')
        }
    }
)

export const checkForAuthorize = createAsyncThunk(
    'auth/checkForAuthorize',
    (_, {rejectWithValue, dispatch}) => {
        try {
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/checkForAuthorize',
    (email: string, {rejectWithValue, dispatch}) => {
        try {
            sendPasswordResetEmail(authWithFirebase, email)
            authChanged(dispatch)
        } catch (error: any) {
            return rejectWithValue('errors.recover')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/checkForAuthorize',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const {resetAuth} = require('./authReducer')
            dispatch(resetAuth())
            dispatch(resetTodo())
            dispatch(resetProjects())
            await signOut(authWithFirebase)
        } catch (error: any) {
            return rejectWithValue(error.errorMessage)
        }
    }
)


