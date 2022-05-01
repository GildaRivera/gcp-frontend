export const login = (user) => (dispatch)=>{
    try {
        dispatch({type:'LOGIN',payload:user})
    } catch (error) {   
        console.error('An error ocurred',error)
    }
}
export const logout = () => (dispatch)=>{
    try {
        dispatch({type:'LOGOUT'})
    } catch (error) {   
        console.error('An error ocurred',error)
    }
}