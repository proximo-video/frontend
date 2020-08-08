import GetLocalWebCamFeed from '../utils/GetLocalWebCamFeed';
export let localStream;
const getUserMediaMiddleware = store => next => async (action) => {
    console.log(action)
    switch (action.type) {
        case 'GETUSERMEDIA':
            const isAudio = store.getState('userMediaPreference').isAudio;
            const isVideo = store.getState('userMediaPreference').isVideo
            localStream = await GetLocalWebCamFeed(true, true);
            let result = next(action);
            console.log(result);
            return result;                  
    }
    return next(action)
}

export default getUserMediaMiddleware;