import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';


const CityWeatherScreen = ({ route }) => {
    const { city } = route.params;
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(`http://10.0.2.2:3000/api/weather/${city}`);
          setWeather(response.data);
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      };
  
      fetchWeather();
    }, [city]);
  
    return (
      <View style={styles.weatherContainer}>
        {weather ? (
          <View style={styles.weatherCard}>
            <Text style={styles.cityName}>{weather.name}</Text>
            <Text style={styles.temperature}>{weather.main.temp}°C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F8FF',
    },
    weatherCard: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    cityName: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    temperature: {
      fontSize: 32,
      color: '#FF4500',
    },
    description: {
      fontSize: 18,
      color: '#555',
    },
  });
  
  export default CityWeatherScreen;