
import React, { useEffect, useState } from 'react'
import { api_key } from '../utilities/apikey'
import MoviesList from '../compnents/MoviesList'

const TopMoviesScreen = () => {

  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`

  return (
      <MoviesList url={url} />
   
  )
}



export default TopMoviesScreen