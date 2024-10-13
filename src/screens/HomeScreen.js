// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const searchCity = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/city', { name: city });
      if (response.data) {
        navigation.navigate('CityWeather', { city });
      }
    } catch (error) {
      console.error('Error searching city:', error);
      Alert.alert('Error', 'Error searching city.');
    }
  };

  const addCity = async () => {
    try {
      // Fazendo uma requisição POST para o backend
      const response = await axios.post('http://10.0.2.2:3000/api/city', { name: city });
      if (response.data) {
        Alert.alert('Success', `City ${city} added successfully!`);
        setCity(''); // Limpa o campo de entrada após adicionar
      }
    } catch (error) {
      console.error('Error adding city:', error);
      Alert.alert('Error', 'Error adding city.');
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Search/Add city" 
        value={city} 
        onChangeText={setCity} 
        style={{ borderWidth: 1, padding: 10 }} 
      />
      <Button title="Search" onPress={searchCity} />
      <Button title="Add City" onPress={addCity} />
    </View>
  );
};

export default HomeScreen;
