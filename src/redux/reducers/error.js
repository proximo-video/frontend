export const errorReducer = (state = "", action) => {
    switch (action.type) {
        case 'ERROR':
            return action.value
        default:
            break;
    }
    return state;
}

export const successReducer = (state = "", action) => {
    switch (action.type) {
        case 'SUCCESS':
            return action.value
        default:
            break;
    }
    return state;
}

export const warningReducer = (state = "", action) => {
    switch (action.type) {
        case 'WARNING':
            return action.value
        default:
            break;
    }
    return state;
}

export const errorRedirectReducer = (state = false, action) => {
    switch (action.type) {
        case 'ERRORREDIRECT':
            return action.value;
        case 'RESET':
            return false;
        default:
            break;
    }
    return state;
}