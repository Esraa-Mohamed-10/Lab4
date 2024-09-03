import { View, Text } from 'react-native'
import React from 'react'
import { api_key } from '../utilities/apikey'
import MoviesList from '../compnents/MoviesList'

const PopularScreen = () => {

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
  return (
    <MoviesList url={url} />
  )
}

export default PopularScreen