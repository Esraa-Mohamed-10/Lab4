import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import routes from '../utilities/routes';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Redux/slices/favoriteSlice';
import {addMoviesToSlice} from '../Redux/slices/movieSlice'


const MoviesList = ({ url, searchWord }) => {
  const [movies, setMovies] = useState([])
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const favoriteList = useSelector((state) => state.favoriteReducer.favorites)


  const isFavorite = (movieId) => favoriteList.includes(movieId)

  const handleFavoriteToggle = (itemID) => {
    if (isFavorite(itemID)) {
      dispatch(removeFromFavorites(itemID))
    }
    else {
      dispatch(addToFavorites(itemID))
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data.results)
        setMovies(data.results)
        dispatch(addMoviesToSlice(data.results))
        return data.results;
      }
      catch (error) {
        console.log(`error : ${error}`)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = searchWord ? movies.filter(movie =>
    movie.title.toLowerCase().includes(searchWord.toLowerCase())
  ) : movies

  return (
    <>

<View style={styles.container}> 
<FlatList
  data={filteredMovies}
  numColumns={2} // Two-column layout
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(routes.movieDetails, { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        style={styles.cardImg}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={styles.rating}>{item.vote_average}</Text>
          </View>
        <IconButton
          icon={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={20}
          iconColor="red"
          onPress={() => handleFavoriteToggle(item.id)}
        />
        </View>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.id.toString()}
/>
</View>
    </>
  )
}



// import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#bbbbbb', // Dark background
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: 220, // Adjust the height to suit the aspect ratio of movie posters
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardContent: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  language: {
    fontSize: 12,
    color: '#bbb',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
});



export default MoviesList