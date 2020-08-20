export const errorReducer = (state ={}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {[action.value.alertType]:action.value.message}
        default:
            break;
    }
    return state;
}