
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
            return { ...state, [action.value.id]: { displayName: action.value.displayName } }
    if (action.type === 'DELETEREMOTEUSER') {
        const newState = { ...state }
        delete newState[action.value]
        return newState
    }
    if (action.type === 'SETREMOTEMEDIAPREFERENCE') {
        const newState = { ...state };
        if (newState.hasOwnProperty(action.value.id)) {
            newState[action.value.id]['isAudio'] = action.value.isAudio;
            newState[action.value.id]['isVideo'] = action.value.isVideo;
        }
        return newState
    }
    return state;
}