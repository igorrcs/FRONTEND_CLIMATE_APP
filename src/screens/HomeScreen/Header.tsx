import React from "react";
import {
  StatusBar,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type HeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
  navigation: any;
};

export default function Header({ navigation }: HeaderProps) {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.headerRightButtons}>
        <TouchableOpacity
          style={headerStyles.headerButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={headerStyles.headerButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={headerStyles.headerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={headerStyles.headerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const headerStyles = {
  header: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#83b6ae7a",
  } as ViewStyle,
  headerRightButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
  } as ViewStyle,
  headerButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#4A90E2",
    borderRadius: 5,
  } as ViewStyle,
  headerButtonText: {
    fontSize: 16,
    color: "#fff",
  } as TextStyle,
};
