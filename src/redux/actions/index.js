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

export const acceptEntry = () => {
    return {
        type: 'ACCEPTENTRY'
    }
}

export const roomFull = () => {
    return {
        type: 'ROOMFULL'
    }
}

export const rejectEntry = () => {
    return {
        type: 'REJECTENTRY'
    }
}

export const addEntryRequest = (value) => {
    return {
        type: 'ADDENTRYREQUEST',
        value
    }
}

export const error = (value) => {
    return {
        type: 'ERROR',
        value
    }
}

export const errorRedirect = (value) => {
    return {
        type: 'ERRORREDIRECT',
        value
    }
}

export const success = (value) => {
    return {
        type: 'SUCCESS',
        value
    }
}
export const warning = (value) => {
    return {
        type: 'WARNING',
        value
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

export const remoteDisconnected = (value) => {
    return {
        type: 'REMOTEDISCONNECTED',
        value
    }
}

export const remoteConnected = (value) => {
    return {
        type: 'REMOTECONNECTED',
        value
    }
}

export const sendMessageSocket = (value) => {
    return {
        type: 'SENDMESSAGESOCKET',
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

export const toggleCameraView = () => {
    return {
        type: 'TOGGLECAMERAVIEW',
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