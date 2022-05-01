const initState = {
    id:'',
    name:'',
    username:'', // O correo como ustedes deseen
    biografia:'', 
    gravatar:'',
    token:''
}

export const userReducer = function(state=initState,action) {
    
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                ...action.payload
            }
        case "LOGOUT":
            return{
                ...initState
            }
        default:
            return state
    }

}
