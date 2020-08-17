export const getUserMediaReducer = (state = false, action) => {
    if (action.type === 'GETUSERMEDIA') {
        return action.value
    }
    return state;
}

export const getUserScreenReducer = (state = false, action) => {
    if (action.type === 'GETUSERSCREEN') {
        return !state;
    }
    if (action.type === 'RESET')
        return false;
    return state;
}

export const getUserMediaPreferenceReducer = (state = { isVideo: true, isAudio: true, cameraView: "user" }, action) => {
    switch (action.type) {
        case 'TOGGLEVIDEO':
            const isVideo = state.isVideo;
            return { ...state, isVideo: !isVideo }
        case 'TOGGLEAUDIO':
            const isAudio = state.isAudio;
            return { ...state, isAudio: !isAudio }
        case 'TOGGLECAMERAVIEW':
            return state.cameraView === "user" ? { ...state, cameraView: "environment" } : { ...state, cameraView: "user" };
        default:
            break;
    }
    return state;
}