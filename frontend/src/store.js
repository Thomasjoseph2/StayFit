import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

import { apiSlice } from './slices/apiSlice';

import adminAuthReducer from './slices/adminAuthSlice';

const store = configureStore({

    reducer:{

        auth:authReducer,

        adminAuth:adminAuthReducer,

        [apiSlice.reducerPath]:apiSlice.reducer,

    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    
    devTools:true
    
})


export default store