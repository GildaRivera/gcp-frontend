import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { albumReducer } from './album/reducer';

import user from './user/reducer'


const reducer = combineReducers({
  user,
  album: albumReducer
})

const store = configureStore({
  reducer,
})

export default store;