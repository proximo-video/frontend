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