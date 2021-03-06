import isLoggedReducer from './isLogged';
import { nameReducer, idReducer, roomsReducer, roomOwnerReducer, remoteUsersReducer} from './userData';
import { combineReducers } from 'redux';
import { getUserMediaReducer, getUserMediaPreferenceReducer, getUserScreenReducer } from './video';
import { remoteStreamCountReducer, messagesReducer, meetingEndedReducer } from './webRTC';
import { entryRequestListReducer, acceptEntryReducer } from './lockedRoom';
import {errorReducer, successReducer, warningReducer, errorRedirectReducer} from './error'

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    name: nameReducer,
    id: idReducer,
    rooms: roomsReducer,
    isRoomOwner: roomOwnerReducer,
    userMedia: getUserMediaReducer,
    userMediaPreference: getUserMediaPreferenceReducer,
    remoteStreamCount: remoteStreamCountReducer,
    remoteUsers: remoteUsersReducer,
    messages: messagesReducer,
    userScreen: getUserScreenReducer,
    meetingEnded: meetingEndedReducer,
    entryRequestList: entryRequestListReducer,
    acceptEntry: acceptEntryReducer,
    error:errorReducer,
    success:successReducer,
    warning:warningReducer,
    errorRedirect:errorRedirectReducer
})

export default allReducers;