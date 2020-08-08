export const getUserMediaReducer = (state=false,action)=>{
    console.log('action',action)
    if(action.type==='GETUSERMEDIA'){
        return action.value 
    }
    return state;
}

export const getUserMediaPreferenceReducer = (state={isVideo:true,isAudio:true},action)=>{
    // console.log('action',action)
    // // if(action.type==='GETUSERMEDIA'){
    // //     return action.value 
    // // }
    return state;
}