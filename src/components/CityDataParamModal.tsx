import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { City } from "../models/City";
import CitySuggestionsList from "./CitySuggestionsList";

interface CityDateModalProps {
  showCityDateModal: boolean;
  closeCityDateModal: () => void;
  cityName: string;
  setCityName: (name: string) => void;
  fetchCitySuggestions: (text: string) => void;
  suggestions: City[];
  handleSelectCity: (city: City) => void;
  date: Date;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
  onDateChange: (event: any, selectedDate?: Date) => void;
  fetchWeatherData: () => void;
}

class CityDateModal extends React.Component<CityDateModalProps> {
  render() {
    const {
      showCityDateModal,
      closeCityDateModal,
      cityName,
      setCityName,
      fetchCitySuggestions,
      suggestions,
      handleSelectCity,
      date,
      setShowDatePicker,
      showDatePicker,
      onDateChange,
      fetchWeatherData,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCityDateModal}
        onRequestClose={closeCityDateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a Cidade e a Data</Text>

            <View style={styles.selectCityContainer}>
              <TextInput
                value={cityName}
                onChangeText={(text) => {
                  setCityName(text);
                  fetchCitySuggestions(text);
                }}
                placeholder="Digite o nome da cidade"
                style={styles.input}
              />

              {suggestions.length > 0 && (
                <CitySuggestionsList
                  suggestions={suggestions}
                  onSelectCity={handleSelectCity}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button
                title="Aplicar"
                onPress={() => {
                  fetchWeatherData();
                  closeCityDateModal();
                }}
              />
              <TouchableOpacity
                onPress={closeCityDateModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 15,
  },
  datePickerText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginLeft: 10,
  },
  closeButtonText: {
    color: "#333",
  },
  selectCityContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
});

export default CityDateModal;
