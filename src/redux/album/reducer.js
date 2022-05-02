const initState = {
    albumId:''
}

export const albumReducer = function(state=initState,action) {
    
    switch(action.type){
        case "SET_ALBUM_ID":
            console.log("action payload",action.payload)
            return {
                ...state,
                albumId: action.payload
            }
        case "SET_ALBUM_TO_DEFAUL":
            return initState
        default:
            return state
    }

}
