import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProject} from '../../models/IProject'
import {defaultFulfilled, defaultPending, defaultRejected} from '../../common/utils'
import {createProject, getProjects} from './projectsActions'

export interface interfaceState {
    projectList: IProject[];
    error: string | null,
    isLoading: boolean
}

const initialState: interfaceState = {
    projectList: [],
    isLoading: false,
    error: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<IProject>) => {
            state.projectList.push(action.payload)
        },
        removeProject: (state, action) => {
            state.projectList = state.projectList.filter(project => project.id !== action.payload)
        },
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projectList = action.payload
        },
        updateProjectsList: (state, action: PayloadAction<IProject>) => {
            const index = state.projectList.findIndex(project => project.id === action.payload.id)
            state.projectList[index] = action.payload
        },
        resetProjects: () => initialState
    },
    extraReducers: (builder => {
        builder.addCase(createProject.pending, (state) => defaultPending(state))
        builder.addCase(createProject.fulfilled, (state) => defaultFulfilled(state))
        builder.addCase(createProject.rejected, (state, action: any) => defaultRejected(state, action))
        builder.addCase(getProjects.pending, (state) => defaultPending(state))
        builder.addCase(getProjects.fulfilled, (state) => defaultFulfilled(state))
        builder.addCase(getProjects.rejected, (state, action: any) => defaultRejected(state, action))
    })
})

export const {setProjects, addProject, resetProjects, removeProject, updateProjectsList} = projectSlice.actions
export default projectSlice.reducer


