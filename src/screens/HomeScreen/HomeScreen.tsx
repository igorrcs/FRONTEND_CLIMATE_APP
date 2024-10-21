import axios from "axios";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Header from "./Header";
import CitySuggestionsList from "../../components/CitySuggestionsList";
import { WeatherData } from "../../models/WheaherData";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date()); // Estado para armazenar a data
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para exibir o DatePicker
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCityDateModal, setShowCityDateModal] = useState(false);
  const [cityName, setCityName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { id: number; name: string }[]
  >([]);

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
        `http://localhost:3002/api/weather/city?name=${query}`
      );
      if (response.data) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const selectCity = (name: string) => {
    setCityName(name);
    setCity(name);
    setSuggestions([]);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleRegister = () => {
    alert("Navigate to Register screen.");
  };

  const openCityDateModal = () => {
    setShowCityDateModal(true);
  };

  const closeCityDateModal = () => {
    setShowCityDateModal(false);
  };

  const citySuggestions = [
    { id: 1, name: "São Paulo" },
    { id: 2, name: "Ourinhos" },
    { id: 3, name: "Jacarezinho" },
  ];

  const handleSelectCity = (cityName: string) => {
    console.log(`Selected city: ${cityName}`);
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
        <Header onLogin={handleLogin} onRegister={handleRegister} />

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <Text style={styles.title}>Weather System</Text>

          <TouchableOpacity
            style={styles.cityDateButton}
            onPress={openCityDateModal}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={showCityDateModal}
          onRequestClose={closeCityDateModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecionar Cidade e Data</Text>
              <TextInput
                style={styles.input}
                value={cityName}
                onChangeText={(text) => {
                  setCityName(text);
                  fetchCitySuggestions(text);
                }}
                placeholder="Digite o nome da cidade"
              />
              {suggestions.length > 0 && (
                <CitySuggestionsList
                  suggestions={citySuggestions}
                  onSelectCity={handleSelectCity}
                />
              )}

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  padding: 10,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 5,
                }}
              >
                <Text>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>

              <Button
                title="Aplicar"
                onPress={() => {
                  fetchWeatherData();
                  closeCityDateModal();
                }}
              />
            </View>
          </View>
        </Modal>

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
}

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  } as ViewStyle,
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
  } as ViewStyle,
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  } as ViewStyle,
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 5,
  } as ViewStyle,
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  } as ViewStyle,
  datePicker: {
    flex: 1,
  } as ViewStyle,
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  } as ViewStyle,
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  } as ViewStyle,
  closeButtonText: {
    color: "red",
    fontSize: 16,
  } as TextStyle,
  suggestionsContainer: {
    maxHeight: 150,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
  } as ViewStyle,
};
