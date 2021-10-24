export const generateId = () => Math.random().toString(36).substr(2, 9)

export const defaultRejected = (state: any, action: any) => {
    state.error = action.payload
    state.isLoading = false
}

export const defaultPending = (state: any) => {
    state.error = null
    state.isLoading = true
}

export const defaultFulfilled = (state: any) => {
    state.isLoading = false
    state.error = null
}

export const onEditObject = (object: { [key in string]: any }, key: string, value: any) => {
    object[key] = value
}
