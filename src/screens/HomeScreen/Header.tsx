import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

type HeaderProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function Header({ onLogin, onRegister }: HeaderProps) {
  return (
    <View style={headerStyles.header}>
      <TouchableOpacity style={headerStyles.headerButton} onPress={onRegister}>
        <Text style={headerStyles.headerButtonText}>Menu</Text>
      </TouchableOpacity>
      <View style={headerStyles.headerRightButtons}>
        <TouchableOpacity style={headerStyles.headerButton} onPress={onLogin}>
          <Text style={headerStyles.headerButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={headerStyles.headerButton}
          onPress={onRegister}
        >
          <Text style={headerStyles.headerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const headerStyles = {
  header: {
    flexDirection: "row" as "row",
    justifyContent: "space-between" as "space-between",
    alignItems: "center" as "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  } as ViewStyle,
  headerRightButtons: {
    flexDirection: "row" as "row",
    alignItems: "center" as "center",
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
