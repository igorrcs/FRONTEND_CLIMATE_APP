import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
    <View>
      {weather ? (
        <>
          <Text>City: {weather.name}</Text>
          <Text>Temperature: {weather.main.temp}°C</Text>
          <Text>Weather: {weather.weather[0].description}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default CityWeatherScreen;
