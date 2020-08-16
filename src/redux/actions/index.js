export const login = () => {
    return {
        type: 'LOGIN'
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const addRemoteStream = () => {
    return {
        type: 'ADDREMOTESTREAM',
    }
}

export const deleteRemoteStream = () => {
    return {
        type: 'DELETEREMOTESTREAM',
    }
}


export const getUserMedia = (value) => {
    return {
        type: 'GETUSERMEDIA',
        value
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}

export const removeUser = (value) => {
    return {
        type: 'REMOVEUSER',
        value
    }
}

export const meetingEnded = () => {
    return {
        type: 'MEETINGENDED'
    }
}

export const meetingStarted = () => {
    return {
        type: 'MEETINGSTARTED'
    }
}

export const getUserScreen = (value) => {
    return {
        type: 'GETUSERSCREEN',
        value
    }
}

export const setIceServers = (value) => {
    return {
        type: 'SETICESERVERS',
        value
    }
}

export const connectSocket = (value) => {
    return {
        type: 'CONNECTSOCKET',
        value
    }
}

export const setRoomOwner = (value) => {
    return {
        type: 'SETROOMOWNER',
        value
    }
}

export const deleteRemoteUser = (value) => {
    return {
        type: 'DELETEREMOTEUSER',
        value
    }
}

export const addRemoteUser = (value) => {
    return {
        type: 'ADDREMOTEUSER',
        value
    }
}

export const addMessage = (value) => {
    return {
        type: 'ADDCHATMESSAGE',
        value
    }
}

export const sendMessage = (value) => {
    return {
        type: 'SENDMESSAGE',
        value
    }
}
export const setRemoteMediaPreference = (value) => {
    return {
        type: 'SETREMOTEMEDIAPREFERENCE',
        value
    }
}

export const toggleAudio = () => {
    return {
        type: 'TOGGLEAUDIO'
    }
}

export const toggleVideo = () => {
    return {
        type: 'TOGGLEVIDEO',
    }
}

export const closeMedia = () => {
    return {
        type: 'CLOSEMEDIA',
    }
}

export const setName = (name) => {
    return {
        type: 'SET_NAME',
        name
    }
}

export const setId = (id) => {
    return {
        type: 'SET_ID',
        id
    }
}

export const setRooms = (rooms) => {
    return {
        type: 'SET_ROOMS',
        rooms
    }
}