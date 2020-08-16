export const entryRequestListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADDENTRYREQUEST':
            return [...state, action.value]
        case 'RESET':
            return []
        default:
            break;
    }
    return state;
}