import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { api_key } from '../utilities/apikey'
import MoviesList from '../compnents/MoviesList'

const HomeScreen = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`

  const [searchValue , setSearchValue]= useState('')

  return (
    <>
     <TextInput placeholder='Search' 
     style={styles.search} 
     placeholderTextColor={'white'} 
     selectionColor={'pink'} 
     onChangeText={text => setSearchValue(text)}
    value={searchValue} />

     <MoviesList url={url} searchWord={searchValue} />
    </>
  )
}
const styles = StyleSheet.create({

  search: {
    height:50,
    width:330,
    marginHorizontal:'auto',
    marginVertical:10,
    borderRadius:10,
    backgroundColor:'#bbbbbb',
    paddingHorizontal:15,
    paddingVertical:10,
    elevation:10,
    shadowColor: '#000',
    fontSize:18,
    color: 'white',
  }
});

export default HomeScreen