export const errorReducer = (state ="", action) => {
    switch (action.type) {
        case 'ERROR':
            return action.value
        default:
            break;
    }
    return state;
}