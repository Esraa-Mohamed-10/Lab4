import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoriteSlice'
import movieReducer from './slices/movieSlice'

export const store = configureStore({
    reducer: {
       favoriteReducer,
       movieReducer 
    }
})