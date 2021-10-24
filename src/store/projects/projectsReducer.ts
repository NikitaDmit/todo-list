import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IProject} from "../../models/IProject"

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
    }
})

export const {setProjects, addProject, resetProjects, removeProject, updateProjectsList} = projectSlice.actions
export default projectSlice.reducer


