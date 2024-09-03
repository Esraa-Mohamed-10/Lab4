import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFavorites, removeFromFavorites } from '../Redux/slices/favoriteSlice';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

const Favorites = () => {

    const favoriteList = useSelector((state)=>state.favoriteReducer.favorites)
    const allMovies = useSelector((state)=>state.movieReducer.movies)

    const favoriteMovies = allMovies.filter((movie)=>favoriteList.includes(movie.id))

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(loadFavorites());
    },[])

    const handleRemove = (id) => {
      dispatch(removeFromFavorites(id));
    };

  return (
    <FlatList 
    data={favoriteMovies}
    numColumns={2}
    renderItem={({item})=>
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
  icon="trash-can-outline"
  size={20}
  iconColor="red"
  onPress={() => handleRemove(item.id)} // Remove item from favorites
/>
      </View>
    </View>
  </TouchableOpacity>}
    
    keyExtractor={(item) => item.id.toString()}
    >

    </FlatList>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#bbbbbb', 
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
