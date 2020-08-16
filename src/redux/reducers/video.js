export const getUserMediaReducer = (state = false, action) => {
    console.log('action', action)
    if (action.type === 'GETUSERMEDIA') {
        return action.value
    }
    return state;
}

export const getUserScreenReducer = (state = false, action) => {
    console.log('action', action)
    if (action.type === 'GETUSERSCREEN') {
        return !state;
    }
    if(action.type ==='RESET')
        return false;
    return state;
}

export const getUserMediaPreferenceReducer = (state = { isVideo: true, isAudio: true }, action) => {
    switch (action.type) {
        case 'TOGGLEVIDEO':
            const isVideo = state.isVideo;
            return { ...state, isVideo: !isVideo }
        case 'TOGGLEAUDIO':
            const isAudio = state.isAudio;
            return { ...state, isAudio: !isAudio }
        default:
            break;
    }
    return state;
}