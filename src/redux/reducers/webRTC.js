export const remoteStreamCountReducer = (state=0,action)=>{
    console.log('action',action)
    switch (action.type){
        case 'ADDREMOTESTREAM':
            return state+1;
        case 'DELETEREMOTESTREAM':
            return state-1;
    }
    return state;
}