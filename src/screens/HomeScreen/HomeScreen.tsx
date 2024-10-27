import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import CityDateParamModal from "../../components/CityDataParamModal";
import { City } from "../../models/City";
import { Weather } from "../../models/Weather";
import { RootStackParamList } from "../../navigation/Navigations";
import Header from "./Header";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showCityDateModal, setShowCityDateModal] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/api/weather", {
        cityName: city,
        stateName: "StateExample",
        countryName: "CountryExample",
        latitude: "0",
        longitude: "0",
        date: date.toISOString().split("T")[0],
      });
      setWeatherData(response.data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  const fetchCitySuggestions = async (query: string) => {
    try {
      const response = await axios.get(
        `http://26.205.42.213:3002/api/city?name=${query}`
      );
      if (response.data) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSelectCity = (city: City) => {
    setCityName(city.name);
    setSuggestions([]); // Limpa as sugestões após a seleção
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const closeCityDateModal = () => {
    setShowCityDateModal(false);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          onLogin={handleLogin}
          onRegister={handleRegister}
          navigation={navigation}
        />

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <Text style={styles.title}>Weather System</Text>

          <TouchableOpacity
            style={styles.cityDateButton}
            onPress={() => setShowCityDateModal(true)}
          >
            <Text style={styles.cityDateButtonText}>
              Selecionar Cidade e Data
            </Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {weatherData && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>
                Cidade: {weatherData.city_name}
              </Text>
              <Text style={styles.weatherText}>
                Temperatura: {weatherData.temperature} °C
              </Text>
              <Text style={styles.weatherText}>
                Descrição: {weatherData.weather_description}
              </Text>
            </View>
          )}

          {weatherData && (
            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>
                Previsoes para os proximos 3 dias:
              </Text>
              {weatherData.forecast.map((day, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text>
                    {day.date}: {day.temp} °C - {day.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <CityDateParamModal
          showCityDateModal={showCityDateModal}
          closeCityDateModal={closeCityDateModal}
          cityName={cityName}
          setCityName={setCityName}
          fetchCitySuggestions={fetchCitySuggestions}
          suggestions={suggestions}
          handleSelectCity={handleSelectCity}
          date={date}
          setShowDatePicker={setShowDatePicker}
          showDatePicker={showDatePicker}
          onDateChange={onDateChange}
          fetchWeatherData={fetchWeatherData}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  } as ViewStyle,
  bodyContainer: {
    alignItems: "center",
    paddingVertical: 20,
  } as ViewStyle,
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "700",
  } as TextStyle,
  cityDateButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  } as ViewStyle,
  cityDateButtonText: {
    color: "white",
    fontSize: 16,
  } as TextStyle,
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  } as ViewStyle,
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  } as TextStyle,
  forecastContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  } as ViewStyle,
  forecastTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  } as TextStyle,
  forecastItem: {
    marginVertical: 5,
    fontSize: 16,
  } as TextStyle,
};

export default HomeScreen;
