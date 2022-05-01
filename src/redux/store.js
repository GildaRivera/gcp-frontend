import { combineReducers, createStore , applyMiddleware } from 'redux';
import  {userReducer}  from './user/reducer';
import  thunk  from 'redux-thunk'
//import { configureStore } from '@reduxjs/toolkit';




const middleWare = applyMiddleware(thunk)
export const store = createStore(userReducer,applyMiddleware)