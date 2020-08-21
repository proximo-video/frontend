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

export const acceptEntryReducer = (state = 'W', action) => {
    switch (action.type) {
        case 'ACCEPTENTRY':
            return 'A';
        case 'RESET':
            return 'W';
        case 'REJECTENTRY':
            return 'R';
        case 'ROOMFULL':
            return 'F';
        default:
            break;
    }
    return state;
}

