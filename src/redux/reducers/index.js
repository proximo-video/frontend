import isLoggedReducer from './isLogged';
import {nameReducer,idReducer,roomsReducer} from './userData';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    name: nameReducer,
    id: idReducer,
    rooms : roomsReducer
})

export default allReducers;