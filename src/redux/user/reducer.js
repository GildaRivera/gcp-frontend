import { createSlice } from "@reduxjs/toolkit";
const initState = {
    id:'',
    name:'',
    username:'', // O correo como ustedes deseen
    biografia:'', 
    gravatar:'',
    token:''
}
const slice = createSlice({
   name:"user",
    initialState: {
       user:null,
        token:null
    },
    reducers: {
      login: (state, action) => {
   console.log("action",action)
        state.user = action.payload;
        //localStorage.setItem('user', JSON.stringify(action.payload))
      },
      logout: (state, action) => {
        state.user = null;
        //localStorage.removeItem('user')
      },
      singin: (state, action) => {
        state.user = action.payload;
        //localStorage.removeItem('user')
      },
      saveToken: (state, action) => {
        state.token = action.payload;
      },
      
    },
  });
  
  export default slice.reducer;
  
 const { login, logout, singin, saveToken } = slice.actions;

 export const loginR =
  ({user,token}) =>
  async (dispatch) => {
    console.log("loginR",user)
    try {
     
      dispatch(login({username:user.username, password:user.password, id:user.id, biografia:user.biografia, gravatar:user.gravatar, name: user.name}));
      dispatch(saveToken({token:token}))
    } catch (e) {
      console.log("e: ", e);
      return console.error(e.message);
    }
  };

  
