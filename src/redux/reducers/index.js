import isLoggedReducer from './isLogged';
import {nameReducer,idReducer,roomsReducer} from './userData';
import {combineReducers} from 'redux';
import {getUserMediaReducer,getUserMediaPreferenceReducer} from './video';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    name: nameReducer,
    id: idReducer,
    rooms : roomsReducer,
    userMedia: getUserMediaReducer,
    userMediaPreference : getUserMediaPreferenceReducer
})

export default allReducers;