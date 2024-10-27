import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
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
  date: Date;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
  onDateChange: (event: any, selectedDate?: Date) => void;
  fetchWeatherData: () => void;
}

class CityDateModal extends React.Component<CityDateModalProps> {
  state = {
    suggestionsVisible: false, // Estado para controlar a visibilidade das sugestões
  };

  handleCityInputChange = (text: string) => {
    const { setCityName, fetchCitySuggestions } = this.props;
    setCityName(text);
    fetchCitySuggestions(text);
    this.setState({ suggestionsVisible: true }); // Mostra sugestões
  };

  handleCitySelection = (city: City) => {
    const { setCityName } = this.props;
    setCityName(city.name);
    this.setState({ suggestionsVisible: false }); // Esconde sugestões
  };

  render() {
    const {
      showCityDateModal,
      closeCityDateModal,
      cityName,
      suggestions,
      date,
      setShowDatePicker,
      showDatePicker,
      onDateChange,
      fetchWeatherData,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  onChangeText={this.handleCityInputChange}
                  placeholder="Digite o nome da cidade"
                  style={styles.input}
                  onFocus={() => this.setState({ suggestionsVisible: true })} // Abre sugestões ao focar
                />

                {this.state.suggestionsVisible && suggestions.length > 0 && (
                  <CitySuggestionsList
                    suggestions={suggestions}
                    onSelectCity={(city) => {
                      this.handleCitySelection(city);
                    }}
                  />
                )}
              </View>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <View style={styles.datePickerContent}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.datePickerText}>
                    Data: {date.toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

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
        </Modal>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalContent: {
    width: "80%",
    padding: 10,
    marginTop: "50%",
    marginBottom: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
    marginLeft: 5,
  },
  datePickerContent: {
    flexDirection: "row",
    alignItems: "center",
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
  suggestionsContainer: {
    width: "100%",
    backgroundColor: "#ffffff3e",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: -12,
  } as ViewStyle,
});

export default CityDateModal;
