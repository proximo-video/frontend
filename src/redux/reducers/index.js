import isLoggedReducer from './isLogged';
import { nameReducer, idReducer, roomsReducer,roomOwnerReducer,remoteUsersReducer } from './userData';
import { combineReducers } from 'redux';
import { getUserMediaReducer, getUserMediaPreferenceReducer,getUserScreenReducer } from './video';
import { remoteStreamCountReducer,messagesReducer,meetingEndedReducer } from './webRTC';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    name: nameReducer,
    id: idReducer,
    rooms: roomsReducer,
    isRoomOwner:roomOwnerReducer,
    userMedia: getUserMediaReducer,
    userMediaPreference: getUserMediaPreferenceReducer,
    remoteStreamCount: remoteStreamCountReducer,
    remoteUsers: remoteUsersReducer,
    messages:messagesReducer,
    userScreen: getUserScreenReducer,
    meetingEnded:meetingEndedReducer
})

export default allReducers;