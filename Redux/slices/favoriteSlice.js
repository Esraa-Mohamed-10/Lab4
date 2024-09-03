// import { createSlice } from "@reduxjs/toolkit";


// export const favoriteSlice = createSlice({
//     name:'favorites',
//     initialState:{
//         favorites:[]
//     },
//     reducers: {
//         addToFavorites: (state,action) => {
//             if(!state.favorites.includes(action.payload)){
//                 state.favorites.push(action.payload)
//             }
//         },
//         removeFromFavorites: (state,action) =>{
//             state.favorites = state.favorites.filter(id => id != action.payload)
//         }
//     }
// })

// export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
// export default favoriteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveFavoritesToStorage = async (favorites) => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to storage:', error);
  }
};

const loadFavoritesFromStorage = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Failed to load favorites from storage:', error);
    return [];
  }
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        saveFavoritesToStorage(state.favorites);  // Save to storage
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id != action.payload);
      saveFavoritesToStorage(state.favorites);  // Save to storage
    },
  },
});

export const { setFavorites, addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;

// Action to load favorites from storage and dispatch to the store
export const loadFavorites = () => async (dispatch) => {
  const favorites = await loadFavoritesFromStorage();
  dispatch(setFavorites(favorites));
};
