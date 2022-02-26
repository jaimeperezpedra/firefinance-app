import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import credentialsReducer from './credentials';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  credentials: credentialsReducer,       
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})