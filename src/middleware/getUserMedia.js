import GetLocalWebCamFeed from '../utils/GetLocalWebCamFeed';
import { detect } from 'detect-browser';
const browser = detect();
export let localStream;
const getUserMediaMiddleware = store => next => async (action) => {
    const userMediaPreference = store.getState().userMediaPreference
    switch (action.type) {
        case 'GETUSERMEDIA':
            if (action.value)
                localStream = await GetLocalWebCamFeed(userMediaPreference.isAudio, userMediaPreference.isVideo);
            break;
        case 'TOGGLEVIDEO':
            if (browser && browser.name === 'firefox') {
                localStream.getVideoTracks().forEach(track => {
                    track.enabled = !userMediaPreference.isVideo;
                });
            } else {
                localStream.getVideoTracks().forEach(track => {
                    track.stop();
                });
                localStream.getAudioTracks().forEach(track => {
                    track.stop();
                });
            }
            break;
        case 'TOGGLEAUDIO':
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !userMediaPreference.isAudio;
            });
            break;
        case 'CLOSEMEDIA':
            localStream.getVideoTracks().forEach(track => {
                track.stop();
            });
            localStream.getAudioTracks().forEach(track => {
                track.stop();
            });
            break;
        default:
            break;

    }
    return next(action)
}

export default getUserMediaMiddleware;