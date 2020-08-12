export const remoteStreamCountReducer = (state=0,action)=>{
    console.log('action',action)
    switch (action.type){
        case 'ADDREMOTESTREAM':
            return state+1;
        case 'DELETEREMOTESTREAM':
            return state-1;
        default:
            break;
    }
    return state;
}

export const messagesReducer = (state=[],action)=>{
    switch (action.type){
        case 'ADDCHATMESSAGE':
            return [...state,action.value]
        default:
            break;
    }
    return state;
}