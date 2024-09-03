import { View, Text } from 'react-native'
import React from 'react'
import { api_key } from '../utilities/apikey'
import MoviesList from '../compnents/MoviesList'

const NowplayingScreen = () => {

  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`

  return (
    <MoviesList url={url} />
  )
}

export default NowplayingScreen