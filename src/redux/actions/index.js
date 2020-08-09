export const login = () =>{
    return {
        type:'LOGIN'
    }
}

export const logout = () =>{
    return {
        type:'LOGOUT'
    }
}


export const getUserMedia = (value)=>{
    return {
        type:'GETUSERMEDIA',
        value
    }
}

export const toggleAudio = ()=>{
    return {
        type:'TOGGLEAUDIO'
    }
}

export const toggleVideo = ()=>{
    return {
        type:'TOGGLEVIDEO',
    }
}

export const closeMedia = ()=>{
    return {
        type:'CLOSEMEDIA',
    }
}



export const setName = (name) =>{
    return{
        type:'SET_NAME',
        name
    }
}

export const setId = (id) =>{
    return{
        type:'SET_ID',
        id
    }
}

export const setRooms = (rooms) =>{
    return{
        type:'SET_ROOMS',
        rooms
    }
}