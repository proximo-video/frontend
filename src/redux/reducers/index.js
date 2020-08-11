import isLoggedReducer from './isLogged';
import { nameReducer, idReducer, roomsReducer,roomOwnerReducer,remoteUsersReducer } from './userData';
import { combineReducers } from 'redux';
import { getUserMediaReducer, getUserMediaPreferenceReducer } from './video';
import { remoteStreamCountReducer } from './webRTC';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    name: nameReducer,
    id: idReducer,
    rooms: roomsReducer,
    isRoomOwner:roomOwnerReducer,
    userMedia: getUserMediaReducer,
    userMediaPreference: getUserMediaPreferenceReducer,
    remoteStreamCount: remoteStreamCountReducer,
    remoteUsers: remoteUsersReducer
})

export default allReducers;