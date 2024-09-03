import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name:'movies',
    initialState:{
        movies:[]
    },
    reducers:{
        addMoviesToSlice:(state,action)=>{
            state.movies = action.payload
        }
    }
})

export const {addMoviesToSlice} = movieSlice.actions
export default movieSlice.reducer;