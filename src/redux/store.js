import { combineReducers, createStore , applyMiddleware } from 'redux';
import  {userReducer}  from './user/reducer';
import  thunk  from 'redux-thunk'
import { albumReducer } from './album/reducer';
//import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    user: userReducer,
    album: albumReducer
})

const middleWare = applyMiddleware(thunk)
export const store = createStore(rootReducer,middleWare)