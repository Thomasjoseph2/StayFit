import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

import { apiSlice } from './slices/apiSlice';

import adminAuthReducer from './slices/adminAuthSlice';

import trainerAuthReducer from './slices/trainerAuthSlice'

const store = configureStore({

    reducer:{

        auth:authReducer,

        adminAuth:adminAuthReducer,

        trainerAuth:trainerAuthReducer,

        [apiSlice.reducerPath]:apiSlice.reducer,

    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    
    devTools:true
    
})


export default store