import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { api_key } from '../utilities/apikey';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

const MovieDetails = () => {
    const route = useRoute();
    const { movieId } = route.params;

    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`);
        const data = await response.json();
        setMovieDetails(data);
        // console.log(data)
      } catch (error) {
        console.log(`error : ${error}`);
      }
      finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  return (
    <>
    <View style={styles.container}>
        {loading?(<View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>):
    //   <ScrollView>
    //    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }}  style={styles.posterImage} />
    //      <Text style={styles.title}>{movieDetails.title}</Text>
    //      <Text style={styles.title}>{movieDetails.origin_country}</Text>
    //      <Text style={styles.title}>{`${movieDetails.vote_average} / ${movieDetails.vote_count}`}</Text>
    //      <Text style={styles.releaseDate}>Release Date</Text>
    //      <Text style={styles.overview }>{movieDetails.release_date}</Text>
    //      <Text style={styles.overview}>{movieDetails.runtime/60}</Text>
    //      <Text style={styles.overview}>Story</Text>
    //      <Text style={styles.overview}>{movieDetails.overview}</Text>

    //       </ScrollView>
    <ScrollView style={styles.container}>
    {/* Back Button */}
    <IconButton
      icon="arrow-left"
      size={24}     
      style={styles.backButton}
    />

    {/* Poster Image */}
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }}
      style={styles.posterImage}
    />

    <View style={styles.contentContainer}>
      {/* Title and Ratings */}
      <Text style={styles.title}>{movieDetails.title}</Text>
      <View style={styles.metadata}>
        <Text style={styles.year}>{movieDetails.release_date.split('-')[0]}</Text>
        <Text style={styles.runtime}>{(movieDetails.runtime / 60).toFixed(2)} h</Text>
        <Text style={styles.genres}> | {movieDetails.genres.map(genre => genre.name).join(', ')}</Text>
      </View>

      {/* Rating Stars */}
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <MaterialIcons name="star-half" size={20} color="#FFD700" />
        <Text style={styles.vote}>{movieDetails.vote_average} / {movieDetails.vote_count}</Text>
      </View>

      {/* Storyline */}
      <Text style={styles.storylineTitle}>Storyline</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>

      {/* Buy Ticket Button */}
      <Button mode="contained" style={styles.button} title=' Buy Ticket' />
       
 
    </View>
  </ScrollView>
          
          }
     
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#295F98',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 15,
      zIndex: 1,
    },
    posterImage: {
      width: '100%',
      height: 400,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 10,
    },
    metadata: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    year: {
      color: '#A9A9A9',
      fontSize: 14,
      marginRight: 5,
    },
    runtime: {
      color: '#A9A9A9',
      fontSize: 14,
    },
    genres: {
      color: '#A9A9A9',
      fontSize: 14,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    vote: {
      color: '#A9A9A9',
      marginLeft: 5,
    },
    storylineTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginVertical: 10,
    },
    overview: {
      color: '#A9A9A9',
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#FFD700',
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
  });

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     //   padding: 20,
//       backgroundColor: '#f5f5f5',
//     },
//     loadingContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     },
//     posterImage:{
//         width:'100%',
//         height:450,
//     },
//     loadingText: {
//       marginTop: 10,
//       fontSize: 16,
//       color: '#000',
//     },
//     poster: {
//       width: '100%',
//       height: 400,
//       resizeMode: 'cover',
//       borderRadius: 10,
//       marginBottom: 20,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 10,
//       color: '#333',
//       marginHorizontal:'auto',
//     },
//     subtitle: {
//       fontSize: 18,
//       color: '#666',
//       marginBottom: 5,
//       marginHorizontal:'auto',
//     },
//     rating: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: '#ffcc00',
//       marginBottom: 10,
//     },
//     releaseDate: {
//       fontSize: 18,
//       color: '#333',
//       marginBottom: 5,
//       marginHorizontal:'auto',
//     },
//     runtime: {
//       fontSize: 18,
//       color: '#333',
//       marginBottom: 15,
//     },
//     overview: {
//       fontSize: 16,
//       color: '#333',
//       lineHeight: 24,
//       marginHorizontal:'auto',
//       textAlign:'center',
//       marginVertical:8
//     },
//     errorText: {
//       fontSize: 18,
//       color: '#f00',
//       textAlign: 'center',
//       marginTop: 20,
//     },
//   });
  
export default MovieDetails



