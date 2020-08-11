
export const nameReducer = (state = '', action) => {
    if (action.type === 'SET_NAME')
        return action.name;
    return state;
}

export const idReducer = (state = '', action) => {
    if (action.type === 'SET_ID')
        return action.id;
    return state;
}

export const roomsReducer = (state = [], action) => {
    if (action.type === 'SET_ROOMS')
        return action.rooms;
    return state;
}

export const roomOwnerReducer = (state = false, action) => {
    if (action.type === 'SETROOMOWNER')
        return action.value;
    return state;
}

export const remoteUsersReducer = (state = {}, action) => {
    if (action.type === 'ADDREMOTEUSER')
        if (!state.hasOwnProperty(action.value.id))
            return { ...state, [action.value.id]: action.value.displayName }
    if (action.type === 'DELETEREMOTEUSER') {
        const newState = { ...state }
        delete newState[action.value]
        return newState
    }
    return state;
}