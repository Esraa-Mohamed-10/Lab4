import { View, Text } from 'react-native'
import React from 'react'
import TopMoviesScreen from './TopMoviesScreen'
import { api_key } from '../utilities/apikey'
import MoviesList from '../compnents/MoviesList'

const UpcomingScreen = () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
  return (
    <MoviesList url={url} />
  )
}

export default UpcomingScreen