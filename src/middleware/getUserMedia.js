import GetLocalWebCamFeed from '../utils/GetLocalWebCamFeed';
import { existingTracks } from './webRTC'
import { detect } from 'detect-browser';
import { sendMessage, getUserMedia } from '../redux/actions';
const browser = detect();
export let localStream;
let displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};
const getUserMediaMiddleware = store => next => async (action) => {
    const userMediaPreference = store.getState().userMediaPreference
    switch (action.type) {
        case 'GETUSERMEDIA':
            if (action.value) {
                localStream = await GetLocalWebCamFeed(userMediaPreference.isAudio, true);
                if (browser && browser.name === 'firefox') {
                    localStream.getVideoTracks().forEach(track => {
                        track.enabled = userMediaPreference.isVideo;
                    });
                } else if (!userMediaPreference.isVideo) {
                    localStream.getVideoTracks().forEach(track => {
                        track.stop();
                    });
                }
                existingTracks.forEach((value, key) => {
                    for (const rtpSender of value) {
                        if (rtpSender.track.kind === 'video') {
                            if (localStream.getVideoTracks().length) {
                                rtpSender.replaceTrack(localStream.getVideoTracks()[0])
                            }
                        }
                        if (rtpSender.track.kind === 'audio') {
                            if (localStream.getAudioTracks().length) {
                                rtpSender.replaceTrack(localStream.getAudioTracks()[0])
                            }
                        }
                    }
                })
            }
            break;
        case 'TOGGLEVIDEO':
            if (browser && browser.name === 'firefox') {
                localStream.getVideoTracks().forEach(track => {
                    track.enabled = !userMediaPreference.isVideo;
                });
            } else if (userMediaPreference.isVideo) {
                localStream.getVideoTracks().forEach(track => {
                    track.stop();
                });
            } else {
                localStream.getTracks().forEach(track => {
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
        case 'GETUSERSCREEN':
            const id = store.getState().id;
            if (action.value) {
                const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                if (!screenStream)
                    return;
                localStream.getVideoTracks().forEach(track => {
                    track.stop();
                    localStream.removeTrack(track);
                });
                localStream.addTrack(screenStream.getVideoTracks()[0])
                existingTracks.forEach((value, key) => {
                    for (const rtpSender of value) {
                        if (rtpSender.track.kind === 'video') {
                            if (screenStream.getVideoTracks().length) {
                                rtpSender.replaceTrack(screenStream.getVideoTracks()[0])
                            }
                        }
                    }
                })
                store.dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: userMediaPreference.isAudio, isVideo: true } }));
            }
            else {
                localStream.getTracks().forEach(track => {
                    track.stop();
                });
                store.dispatch(getUserMedia(false));
                store.dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: userMediaPreference.isAudio, isVideo: userMediaPreference.isVideo } }));
            }
            break;
        default:
            break;

    }
    return next(action)
}

export default getUserMediaMiddleware;