
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
    const newState = { ...state };
    switch (action.type) {
        case 'ADDREMOTEUSER':
            if (!state.hasOwnProperty(action.value.id))
                return { ...state, [action.value.id]: { displayName: action.value.displayName } }
            break;
        case 'DELETEREMOTEUSER':
            delete newState[action.value]
            return newState
        case 'SETREMOTEMEDIAPREFERENCE':
            if (newState.hasOwnProperty(action.value.id)) {
                newState[action.value.id]['isAudio'] = action.value.isAudio;
                newState[action.value.id]['isVideo'] = action.value.isVideo;
                newState[action.value.id]['isScreen'] = action.value.isScreen;
            }
            return newState
        case 'REMOTEDISCONNECTED':
            if (newState.hasOwnProperty(action.value)) {
                newState[action.value]['disconnected'] = true;
                return newState;
            }
            break;
        case 'REMOTECONNECTED':
            if (newState.hasOwnProperty(action.value)) {
                newState[action.value]['disconnected'] = false;
                return newState;
            }
            break;
        default:
            break;
    }
    return state;
}