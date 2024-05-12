import React, { useContext } from 'react';
import { View, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { styles } from './styles';
import Title from '../../Components/Title'
import { StatusBar } from 'expo-status-bar';
import Categories from '../../Components/Categories';
import { TicketContext } from '../../context/TicketContext';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // імпортую FontAwesome

const { width } = Dimensions.get('window');

export default function Home({navigation}) {
  const { movies, setDetailMovie, setSearch, search } = useContext(TicketContext);

  const movieDetails = (item) => {
    navigation.navigate('Details')
    axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=a7c113a3ac789f97bba5838bcc13852a&language=en-US`).then((response) => {
      setDetailMovie(response.data)}).catch(error => console.log(error));
  };

  const showCredits = () => {
    Alert.alert(
      'ПМП',
      'Роботу виконав Мілєнький Юрій ІСД-31',
      [{ text: 'Закрити', onPress: () => console.log('Закрито') }],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='light'/>
        <Title style={{marginTop: 60, marginLeft: 24}} text='MilenkijYura SCD-31' />
        <TouchableOpacity onPress={showCredits} style={styles.creditsButton}>
          <FontAwesome name="user" size={24} color="white" /> 
        </TouchableOpacity>
        <TextInput placeholderTextColor={'gray'} placeholder='Search' value={search} onChangeText={value => setSearch(value)} style={[styles.searchInput, {marginHorizontal: 24}]} />
        <View>
            <Title text='Категорії' style={{fontWeight: '700', marginLeft: 24}} />
        </View>
        <Categories />
        <FlatList
          data={movies}
          keyExtractor={(item) => String(item.id)}
          horizontal
          ListEmptyComponent={(<View style={{flex: 1, width: width, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: 'white', fontSize: 20,}}>No Movies Found...</Text></View>)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => movieDetails(item)} style={styles.card}>
              <Image style={styles.cardImage} source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
            </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  )
}